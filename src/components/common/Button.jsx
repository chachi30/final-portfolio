import '../../styles/common/Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  href = null,
  target = null,
  rel = null,
  className = '',
  ariaLabel = '',
  loading = false,
  ...props
}) => {
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size}
    ${fullWidth ? 'button-full-width' : ''}
    ${icon ? `button-with-icon button-icon-${iconPosition}` : ''}
    ${loading ? 'button-loading' : ''}
    ${className}
  `.trim();
  
  const buttonContent = (
    <>
      {loading && <span className="button-spinner"></span>}
      
      {icon && iconPosition === 'left' && (
        <span className="button-icon">{icon}</span>
      )}
      
      <span className="button-text">{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="button-icon">{icon}</span>
      )}
    </>
  );
  
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        aria-label={ariaLabel || undefined}
        {...props}
      >
        {buttonContent}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || undefined}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;