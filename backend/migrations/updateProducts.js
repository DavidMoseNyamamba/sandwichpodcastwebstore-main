import mongoose from 'mongoose';
import productModel from '../models/productModel.js';
import 'dotenv/config';

const updateExistingProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update all products that don't have trending field
        const result = await productModel.updateMany(
            { trending: { $exists: false } }, // Find products without trending field
            { $set: { trending: false } }     // Set trending to false
        );

        console.log(`Updated ${result.modifiedCount} products with trending field`);

        // Also update products that don't have bestseller field
        const bestsellerResult = await productModel.updateMany(
            { bestseller: { $exists: false } }, // Find products without bestseller field
            { $set: { bestseller: false } }     // Set bestseller to false
        );

        console.log(`Updated ${bestsellerResult.modifiedCount} products with bestseller field`);

        // Close the connection
        await mongoose.connection.close();
        console.log('Migration completed successfully');

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

updateExistingProducts();
