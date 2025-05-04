import '../../styles/common/SectionHeading.css';

const SectionHeading = ({ 
  title, 
  subtitle = '', 
  align = 'center', 
  withLine = true,
  className = '' 
}) => {
  return (
    <div className={`section-heading section-heading-${align} ${className}`}>
      <h2 className={`heading-title ${withLine ? 'with-line' : ''}`}>{title}</h2>
      {subtitle && <p className="heading-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;