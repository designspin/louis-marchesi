import Typography from 'typography';
import Theme from 'typography-theme-alton';

const typography = new Typography(Theme);
const { rhythm, scale } = typography;

export { rhythm, scale, typography as default};