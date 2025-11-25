import type { FC, CSSProperties } from 'react';
import Slider from 'react-perfect-slider';

const slideStyle: CSSProperties = {
  width: '100%',
  height: 240,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  background: '#f3f4f6',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
};

const buttonStyle: CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #e5e7eb',
  background: 'white',
  cursor: 'pointer',
};

export const App: FC = () => {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16, fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>react-perfect-slider demo</h1>
      <p style={{ marginBottom: 16, color: '#4b5563' }}>Autoplay enabled, 3 slides, custom controls.</p>

      <Slider
        autoplay={true}
        autoplayDuration={3000}
        transitionDuration={600}
        renderControls={(next, previous, goTo, current, total) => (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
            <button type="button" style={buttonStyle} onClick={previous}>Previous</button>
            <button type="button" style={buttonStyle} onClick={next}>Next</button>
            <button type="button" style={buttonStyle} onClick={() => goTo(0)}>Go: 1</button>
            <button type="button" style={buttonStyle} onClick={() => goTo(1)}>Go: 2</button>
            <button type="button" style={buttonStyle} onClick={() => goTo(2)}>Go: 3</button>
            <span style={{ marginLeft: 'auto', color: '#6b7280' }}>Slide {current + 1} / {total}</span>
          </div>
        )}
      >
        <div style={{ ...slideStyle, background: '#fee2e2' }}>First Slide</div>
        <div style={{ ...slideStyle, background: '#dbeafe' }}>Second Slide</div>
        <div style={{ ...slideStyle, background: '#dcfce7' }}>Third Slide</div>
      </Slider>
    </div>
  );
}


