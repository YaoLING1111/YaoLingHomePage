/**
 * Radar2Plan content / 内容维护入口
 * videoUrl points to the web copy with its first second removed; preserve the source film.
 * Set arxivUrl / codeUrl only AFTER the public links exist; no fake links.
 * The PDF currently is the user-provided anonymous submission, not an arXiv release.
 */
export const project = {
  title: 'Radar2Plan: Benchmarking 4D Radar for End-to-End Open-Loop Ego-Trajectory Planning',
  paperUrl: '/research/radar2plan/radar2plan-paper.pdf',
  videoUrl: '/assets/radar2plan/overview-no-cover.mp4',
  arxivUrl: '',
  codeUrl: '',
  authors: [
    { name: 'Ling Yao', affiliations: '1,2', href: '/', corresponding: false },
    { name: 'Yichun Xiao', affiliations: '1', href: '', corresponding: false },
    { name: 'Jin Jin', affiliations: '3', href: '', corresponding: false },
    { name: 'Yihan Zhang', affiliations: '2', href: '', corresponding: false },
    { name: 'Fangqiang Ding', affiliations: '1', href: '', corresponding: true },
  ],
  affiliations: [
    'The Hong Kong University of Science and Technology (Guangzhou)',
    'Shanghai Jiao Tong University',
    'University of Oxford',
  ],
};

export const sensors = ['C', 'R', 'L', 'C+R', 'C+L', 'R+L', 'C+R+L'];
export const sensorNames = [
  'Camera',
  '4D Radar',
  'LiDAR',
  'Camera + Radar',
  'Camera + LiDAR',
  'Radar + LiDAR',
  'Camera + Radar + LiDAR',
];
export const planners = ['GRU', 'Sparse Query', 'Vocabulary', 'Diffusion'];

// Exact Table III values: rows = sensor configurations, columns = planners.
// Top-1 ADE over the 6-second horizon, metres; LOWER is better.
export const datasets = [
  {
    id: 'dsert',
    name: 'DSERT-RoLL',
    setting: 'Urban & suburban driving',
    samples: '10,650',
    split: '7,052 / 1,305 / 2,293',
    conditions: 'Clear, fog, light rain, heavy rain, light snow, heavy snow',
    values: [
      [2.71, 2.95, 3.2, 3.06],
      [2.55, 2.45, 2.71, 2.51],
      [2.71, 2.52, 2.81, 2.53],
      [2.57, 2.38, 3.04, 2.86],
      [2.76, 3.24, 3.06, 2.91],
      [2.49, 3.26, 2.53, 2.41],
      [2.48, 3.08, 3.37, 2.6],
    ],
  },
  {
    id: 'man',
    name: 'MAN TruckScenes',
    setting: 'Highway & terminal trucking',
    samples: '16,403',
    split: '13,113 / 1,643 / 1,647',
    conditions: 'Clear, overcast, rain, illumination, twilight, dark',
    values: [
      [5.54, 5.78, 5.75, 7.03],
      [2.1, 1.96, 2.11, 2.18],
      [6.23, 6.11, 11.81, 6.43],
      [2.26, 2.36, 2.25, 2.26],
      [5.21, 4.67, 5.7, 6.96],
      [1.76, 1.98, 2.17, 2.29],
      [2.56, 2.28, 2.44, 2.4],
    ],
  },
];

// @misc rather than an accepted-conference entry. Add an identifier after arXiv release.
export const bibtex = `@misc{yao2026radar2plan,
  title  = {Radar2Plan: Benchmarking 4D Radar for End-to-End
            Open-Loop Ego-Trajectory Planning},
  author = {Yao, Ling and Xiao, Yichun and Jin, Jin and
            Zhang, Yihan and Ding, Fangqiang},
  year   = {2026}
}`;
