import '../../styles/common/Card.css';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = 'lift',
  onClick = null,
  href = null,
  target = null
}) => {
  const cardClasses = `
    card 
    card-${variant}
    hover-${hover}
    ${className}
  `;
  
  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        className={cardClasses} 
        onClick={onClick}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardMedia = ({ src, alt = '', className = '' }) => {
  return (
    <div className={`card-media ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`card-header ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      {subtitle && <div className="card-subtitle">{subtitle}</div>}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
};

export const CardBadge = ({ children, color = 'primary', className = '' }) => {
  return (
    <span className={`card-badge badge-${color} ${className}`}>
      {children}
    </span>
  );
};

export default Card;