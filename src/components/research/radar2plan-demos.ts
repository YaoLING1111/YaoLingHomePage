// Labels verified against the supplied final films and their manifests.
// To replace a clip later, keep its video, poster and metadata together here.
// A demo is a qualitative example, never an estimate of aggregate performance.
export interface Demo {
  file: string;
  label: string;
  dataset: string;
  condition: string;
  planner: string;
  sensors: string;
  evidence: string;
  note: string;
}
export const demoBase = '/assets/radar2plan/demos/';
const sensingNote =
  'Synchronized camera frames and projected radar returns; boxes are official 2D ground truth, not detector predictions. No planning output is shown.';
export const sensing: Demo[] = [
  ['heavy-rain', 'Heavy Rain'],
  ['heavy-snow', 'Heavy Snow'],
  ['fog', 'Fog'],
  ['light-snow', 'Light Snow'],
  ['night', 'Night'],
  ['clear', 'Clear'],
].map(([file, condition]) => ({
  file: `sensing-${file}`,
  label: condition,
  dataset: 'DSERT-RoLL',
  condition,
  planner: 'None · sensing only',
  sensors: 'Official annotations · Camera and 4D radar sensing.',
  evidence: 'Illustrative example',
  note: sensingNote,
}));
const standaloneNote =
  'Radar-only input achieves the lowest single-modality Top1ADE for every planning baseline on both datasets. Left: illustrative predictions. Right: full-validation aggregate results, not errors for the displayed sample.';
export const standalone: Demo[] = [
  { file: 'radar-only-dsert-clear-gru', label: 'DSERT · Clear', dataset: 'DSERT-RoLL', condition: 'Clear', planner: 'GRU' },
  {
    file: 'radar-only-man-overcast-vocabulary',
    label: 'MAN · Overcast / Vocabulary',
    dataset: 'MAN TruckScenes',
    condition: 'Overcast',
    planner: 'Vocabulary',
  },
  {
    file: 'radar-only-dsert-light-rain-sparse-query',
    label: 'DSERT · Light Rain',
    dataset: 'DSERT-RoLL',
    condition: 'Light Rain',
    planner: 'Sparse Query',
  },
  {
    file: 'radar-only-man-overcast-diffusion',
    label: 'MAN · Overcast / Diffusion',
    dataset: 'MAN TruckScenes',
    condition: 'Overcast',
    planner: 'Diffusion',
  },
].map((item) => ({
  ...item,
  sensors: '4D Radar only · charts: C / R / L',
  evidence: 'Illustrative example + aggregate charts',
  note: standaloneNote,
}));
const adverseNote =
  'The particularly large improvements under adverse weather and challenging illumination indicate that 4D radar is especially valuable when camera or LiDAR observations become less reliable. Left: an illustrative example. Right: condition-specific aggregate results.';
export const adverse: Demo[] = [
  {
    file: 'planning-dsert-heavy-snow-sparse-query',
    label: 'DSERT · Heavy Snow',
    dataset: 'DSERT-RoLL',
    condition: 'Heavy Snow',
    planner: 'Sparse Query',
  },
  {
    file: 'planning-dsert-heavy-rain-diffusion',
    label: 'DSERT · Heavy Rain',
    dataset: 'DSERT-RoLL',
    condition: 'Heavy Rain',
    planner: 'Diffusion',
  },
  { file: 'planning-man-dark-gru', label: 'MAN · Dark', dataset: 'MAN TruckScenes', condition: 'Dark', planner: 'GRU' },
  { file: 'planning-man-rain-gru', label: 'MAN · Rain', dataset: 'MAN TruckScenes', condition: 'Rain', planner: 'GRU' },
].map((item) => ({
  ...item,
  sensors: '4D Radar only · charts: C / R / L',
  evidence: 'Illustrative example + aggregate charts',
  note: adverseNote,
}));
const fusionNote =
  'Representative planning predictions and their corresponding BEV trajectories. These are illustrative six-second open-loop predictions, not aggregate evidence.';
export const fusion: Demo[] = [
  {
    file: 'fusion-dsert-heavy-rain-sparse-query',
    label: 'DSERT · Heavy Rain',
    dataset: 'DSERT-RoLL',
    condition: 'Heavy Rain',
    planner: 'Sparse Query',
    sensors: 'Camera → Camera + 4D Radar · radar-only reference',
  },
  {
    file: 'fusion-dsert-light-snow-diffusion',
    label: 'DSERT · Light Snow',
    dataset: 'DSERT-RoLL',
    condition: 'Light Snow',
    planner: 'Diffusion',
    sensors: 'Camera + LiDAR → Camera + 4D Radar + LiDAR · radar-only reference',
  },
  {
    file: 'fusion-man-overcast-gru',
    label: 'MAN · Overcast',
    dataset: 'MAN TruckScenes',
    condition: 'Overcast',
    planner: 'GRU',
    sensors: 'LiDAR → 4D Radar + LiDAR · radar-only reference',
  },
  {
    file: 'fusion-man-dark-gru',
    label: 'MAN · Dark',
    dataset: 'MAN TruckScenes',
    condition: 'Dark',
    planner: 'GRU',
    sensors: 'Camera → Camera + 4D Radar · radar-only reference',
  },
].map((item) => ({ ...item, evidence: 'Illustrative example', note: fusionNote }));
export const pipeline: Demo[] = [
  {
    file: 'benchmark-pipeline',
    label: 'Benchmark pipeline',
    dataset: 'DSERT-RoLL + MAN TruckScenes',
    condition: 'Benchmark design',
    planner: 'GRU · Sparse Query · Vocabulary · Diffusion',
    sensors: 'Seven C / R / L configurations',
    evidence: 'Method illustration',
    note: 'Radar2Plan connects sensor encoders, scene representations, and planning heads through common interfaces, enabling controlled comparisons between different sensor and planner configurations.',
  },
];
export const gain: Demo[] = [
  {
    file: 'aggregate-radar-gain',
    label: 'Aggregate Radar Gain',
    dataset: 'DSERT-RoLL + MAN TruckScenes',
    condition: 'Overall evaluation',
    planner: 'All four planners',
    sensors: 'C → CR · L → RL · CL → CRL',
    evidence: 'Aggregate results',
    note: 'Adding 4D radar reduces Top-1 ADE in 22 of 24 matched comparisons. Both DSERT-RoLL regressions are retained: Sparse Query, L → RL (−0.75 m gain), and Vocabulary, CL → CRL (−0.31 m gain), as reported in the source figure.',
  },
];
export const modular: Demo[] = [
  {
    file: 'plug-and-play',
    label: 'Plug-and-play benchmark design',
    dataset: 'DSERT-RoLL + MAN TruckScenes',
    condition: 'Benchmark design',
    planner: 'Interchangeable planning heads',
    sensors: 'Configurable sensor inputs',
    evidence: 'Method illustration',
    note: 'This design allows individual components to be exchanged independently while maintaining a consistent evaluation protocol across sensor configurations and planning methods.',
  },
];
