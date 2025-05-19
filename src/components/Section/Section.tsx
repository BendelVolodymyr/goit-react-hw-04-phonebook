import { SectionProps } from 'type/Section';
import styled from './Section.module.scss';

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className={styled['section']}>
      <div>
        {title !== undefined && <h2>{title}</h2>}
        {children !== undefined && children}
      </div>
    </section>
  );
};

export default Section;
