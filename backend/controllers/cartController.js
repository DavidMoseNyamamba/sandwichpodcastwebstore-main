import userModel from "../models/userModel.js"


// add products to user cart
const addToCart = async (req, res) => {
    try {
        console.log('=== CART DEBUG ===')
        console.log('Request body:', req.body)
        console.log('Request headers:', req.headers)
        console.log('==================')
        
        const{userId, itemId, size} = req.body

        if (!userId) {
            return res.json({success:false, message:'User ID not found in request'})
        }

        const userData = await userModel.findById(userId)
        
        if (!userData) {
            return res.json({success:false, message:'User not found'})
        }

        console.log('User found:', userData.name)
        console.log('Current cartData:', userData.cartData)

        // Initialize cartData if it doesn't exist or is null
        let cartData = userData.cartData || {}

        if (cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        
        // Update the user's cart data
        console.log('New cartData to save:', cartData)
        
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            {cartData}, 
            {new: true}
        )

        console.log('Updated user cartData:', updatedUser.cartData)

        if (!updatedUser) {
            return res.json({success:false, message:'Failed to update cart'})
        }

        res.json({success:true, message:'Product added to cart'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

// update user cart
const updateCart = async (req, res) => {
    try {

        const {userId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)
        
        if (!userData) {
            return res.json({success:false, message:'User not found'})
        }

        // Initialize cartData if it doesn't exist or is null
        let cartData = userData.cartData || {}

        // If quantity is 0 or less, remove the item
        if (quantity <= 0) {
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size]
                // If no sizes left for this item, remove the item entirely
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId]
                }
            }
        } else {
            // Ensure the item exists in cart
            if (!cartData[itemId]) {
                cartData[itemId] = {}
            }
            cartData[itemId][size] = quantity
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            {cartData}, 
            {new: true}
        )

        if (!updatedUser) {
            return res.json({success:false, message:'Failed to update cart'})
        }

        res.json({success:true, message:'Cart updated successfully'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    
    try {
        const {userId} = req.body

        console.log('Getting cart for userId:', userId)

        const userData = await userModel.findById(userId)
        
        if (!userData) {
            return res.json({success:false, message:'User not found'})
        }

        // Return cartData or empty object if it doesn't exist
        let cartData = userData.cartData || {}

        console.log('Returning cartData:', cartData)

        res.json({success:true, cartData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

export {addToCart,updateCart,getUserCart}