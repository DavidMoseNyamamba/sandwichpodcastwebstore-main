import PropTypes from 'prop-types'

// Main Loading Component
const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  showText = true, 
  className = '', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
        <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
        {showText && (
          <p className={`text-gray-600 mt-4 font-medium ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
      {showText && (
        <p className={`text-gray-600 mt-4 font-medium ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  )
}

// Specific loading components for common use cases
export const PageLoading = ({ text = 'Loading page...' }) => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <Loading size="lg" text={text} />
  </div>
)

export const CardLoading = ({ text = 'Loading...' }) => (
  <div className="bg-white rounded-lg shadow-md p-8">
    <Loading size="md" text={text} />
  </div>
)

export const ButtonLoading = ({ 
  children, 
  isLoading = false, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      link: 'text-blue-600 hover:text-blue-800 underline bg-transparent p-0 focus:ring-blue-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }
    
    const sizeClasses = {
      sm: variant === 'link' ? 'text-sm' : 'px-3 py-2 text-sm',
      md: variant === 'link' ? 'text-base' : 'px-4 py-2 text-base',
      lg: variant === 'link' ? 'text-lg' : 'px-6 py-3 text-lg'
    }
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  }

  return (
    <button
      className={getButtonClasses()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className={`animate-spin rounded-full border-2 ${variant === 'link' ? 'border-blue-600' : variant === 'danger' ? 'border-red-200' : 'border-white'} border-t-transparent ${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} mr-2`} />
      )}
      {children}
    </button>
  )
}

export const InlineLoading = ({ size = 'sm', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
    </div>
  )
}

export const TableLoading = ({ rows = 5, columns = 4 }) => (
  <div className="animate-pulse">
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid gap-4 py-4 border-b" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
    ))}
  </div>
)

// PropTypes for components
Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  text: PropTypes.string,
  showText: PropTypes.bool,
  className: PropTypes.string,
  fullScreen: PropTypes.bool
}

PageLoading.propTypes = {
  text: PropTypes.string
}

CardLoading.propTypes = {
  text: PropTypes.string
}

ButtonLoading.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'link', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func
}

InlineLoading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string
}

TableLoading.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number
}

export default Loading