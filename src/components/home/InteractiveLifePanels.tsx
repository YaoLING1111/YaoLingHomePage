import { useEffect, useRef, useState } from 'react';

type Country = {
  id: string;
  selector: string;
  name: string;
  en: string;
  region: string;
  x: number;
  y: number;
  note: string;
};

const countries: Country[] = [
  { id: 'cn', selector: '.China, #TW', name: '中国', en: 'China', region: '东亚', x: 78.4, y: 35.6, note: '主页原点：上海交通大学，也是研究路线的起点。' },
  { id: 'jp', selector: '.Japan', name: '日本', en: 'Japan', region: '东亚', x: 85.8, y: 31.8, note: '仙台暑期工程项目：ROS 小车、YOLOv8 与 A*，把旅行变成机器人系统现场。' },
  { id: 'th', selector: '#TH', name: '泰国', en: 'Thailand', region: '东南亚', x: 76.8, y: 48.2, note: '热带坐标，给高密度学习和项目周期之间留一点充电时间。' },
  { id: 'se', selector: '#SE', name: '瑞典', en: 'Sweden', region: '欧洲', x: 52.9, y: 17.8, note: 'Stockholm / KTH：交换学期，把机器人、估计和北欧冬天一起装进行李箱。' },
  { id: 'fi', selector: '#FI', name: '芬兰', en: 'Finland', region: '欧洲', x: 55.1, y: 16.2, note: '北欧第二盏灯：安静、清冷、有秩序，适合写代码和想模型。' },
  { id: 'fr', selector: '.France', name: '法国', en: 'France', region: '欧洲', x: 50.5, y: 27.2, note: '艺术、城市和漫游感，给理工脑补一点颜色。' },
  { id: 'de', selector: '#DE', name: '德国', en: 'Germany', region: '欧洲', x: 52, y: 24.2, note: '精密感坐标：控制、工程和系统感在这里意外同频。' },
  { id: 'at', selector: '#AT', name: '奥地利', en: 'Austria', region: '欧洲', x: 52.8, y: 27.3, note: '音乐和山之间的一站，适合把时间调成慢速。' },
  { id: 'ro', selector: '#RO', name: '罗马尼亚', en: 'Romania', region: '欧洲', x: 55.2, y: 29, note: '东欧印章：地图上不那么喧哗，但很容易被记住。' },
  { id: 'es', selector: '#ES', name: '西班牙', en: 'Spain', region: '欧洲', x: 48.5, y: 32, note: '阳光、广场和晚一点开始的生活。' },
  { id: 'pt', selector: '#PT', name: '葡萄牙', en: 'Portugal', region: '欧洲', x: 46.6, y: 32.4, note: '欧洲西侧的边界感，像地图翻页前的一枚句号。' },
];

const games = [
  { name: 'UNO', type: '轻松', colors: ['#6477ad', '#c97e8f'], image: '/img/boardgames/uno.webp', note: '最快破冰，也最快开始互相针对。' },
  { name: '阿瓦隆', type: '阵营', colors: ['#446789', '#84749d'], image: '/img/boardgames/avalon.webp', note: '信息、身份和语气组成的桌面实验。' },
  { name: '血染钟楼', type: '推理', colors: ['#635579', '#a45f6f'], image: '/img/boardgames/blood-on-the-clocktower.webp', note: '信息量爆炸，但越乱越好玩。' },
  { name: '斗地主', type: '牌类', colors: ['#8f5961', '#ba8a5f'], image: '/img/boardgames/doudizhu.png', note: '朴素、直接，很容易突然上头。' },
  { name: '桥牌', type: '牌类', colors: ['#405a70', '#5d8d83'], image: '/img/boardgames/bridge.png', note: '理性玩家的高密度信息战。' },
  { name: '掼蛋', type: '牌类', colors: ['#4f817f', '#a58959'], image: '/img/boardgames/guandan.png', note: '搭档默契与牌运一起被检验。' },
  { name: '德州扑克', type: '牌类', colors: ['#315e5b', '#915f72'], image: '/img/boardgames/texas-holdem.png', note: '概率、表情管理和一点胆量。' },
  { name: '奶酪大盗', type: '我的在线游戏', colors: ['#b99553', '#817254'], image: '/img/boardgames/cheese-thief.webp', note: '我用 Express 与 Socket.IO 实现了可多人联机的身份推理版本。', href: '/post/cheese-game-multiplayer/' },
  { name: 'SCOUT', type: '轻策', colors: ['#4e75a7', '#b99a5e'], image: '/img/boardgames/scout.webp', note: '轻巧但很有手牌节奏感。' },
  { name: '骗子酒馆', type: '派对', colors: ['#795b65', '#485a70'], image: '/img/boardgames/liars-bar.webp', note: '说真话像骗人，说假话像演讲。' },
  { name: '狼人杀', type: '阵营', colors: ['#48566b', '#756aa4'], image: '/img/boardgames/one-night-werewolf.webp', note: '发言、站边、背锅，一局全有。' },
  { name: '鹅鸭杀', type: '阵营', colors: ['#4d8586', '#5275a2'], image: '/img/boardgames/goose-goose-duck.webp', note: '混乱语音局，快乐浓度很高。' },
  { name: 'CABO', type: '轻松', colors: ['#756aa4', '#b8955c'], image: '/img/boardgames/cabo.webp', note: '记忆、猜测和低分执念。' },
  { name: '无间风云', type: '推理', colors: ['#3d4a59', '#806c67'], image: '/img/boardgames/good-cop-bad-cop-real.png', note: '身份藏得越深，桌面越安静。' },
  { name: '大富翁', type: '经典', colors: ['#558174', '#b78f57'], image: '/img/boardgames/monopoly.png', note: '买地、收租、翻脸，经典经济学。' },
  { name: 'ACQUIRE 并购', type: '策略', colors: ['#426d81', '#a98e61'], image: '/img/boardgames/acquire.webp', note: '酒店、股票、吞并，优雅地制造竞争。' },
];

const sports = [
  { id: 'badminton', name: '羽毛球', en: 'Badminton', tone: 'sky', icon: '/img/sports/badminton.png' },
  { id: 'table-tennis', name: '乒乓球', en: 'Table Tennis', tone: 'violet', icon: '/img/sports/table-tennis.png' },
  { id: 'tennis', name: '网球', en: 'Tennis', tone: 'lime', icon: '/img/sports/tennis.png' },
  { id: 'taekwondo', name: '跆拳道', en: 'Taekwondo', tone: 'rose', icon: '/img/sports/taekwondo.png' },
  { id: 'figure-skating', name: '花滑', en: 'Figure Skating', tone: 'ice', icon: '/img/sports/figure-skating.png' },
  { id: 'swimming', name: '游泳', en: 'Swimming', tone: 'cyan', icon: '/img/sports/swimming.png' },
  { id: 'archery', name: '射箭', en: 'Archery', tone: 'amber', icon: '/img/sports/archery.png' },
  { id: 'basketball', name: '篮球', en: 'Basketball', tone: 'orange', icon: '/img/sports/basketball.png' },
  { id: 'volleyball', name: '排球', en: 'Volleyball', tone: 'blue', icon: '/img/sports/volleyball.png' },
] as const;

export default function InteractiveLifePanels() {
  const [activeId, setActiveId] = useState(countries[0].id);
  const [mapMarkup, setMapMarkup] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  const gameTrackRef = useRef<HTMLDivElement>(null);
  const active = countries.find((country) => country.id === activeId) ?? countries[0];

  useEffect(() => {
    let cancelled = false;
    fetch('/world-map.svg')
      .then((response) => {
        if (!response.ok) throw new Error(`Map request failed: ${response.status}`);
        return response.text();
      })
      .then((markup) => {
        const document = new DOMParser().parseFromString(markup, 'image/svg+xml');
        document.querySelectorAll('style').forEach((style) => style.remove());
        const svg = document.querySelector('svg');
        if (!svg) throw new Error('Map SVG root is missing');
        svg.removeAttribute('fill');
        svg.removeAttribute('stroke');
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        if (!cancelled) setMapMarkup(svg.outerHTML);
      })
      .catch(() => {
        if (!cancelled) setMapMarkup('');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapMarkup) return;

    map.querySelectorAll('.visited-country, .active-country').forEach((node) => {
      node.classList.remove('visited-country', 'active-country');
      node.removeAttribute('data-country-id');
    });
    countries.forEach((country) => {
      map.querySelectorAll(country.selector).forEach((node) => {
        node.classList.add('visited-country');
        node.setAttribute('data-country-id', country.id);
      });
    });
    map.querySelectorAll(active.selector).forEach((node) => node.classList.add('active-country'));
  }, [active, mapMarkup]);

  const selectMapRegion = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    const region = target.closest('[data-country-id]');
    const countryId = region?.getAttribute('data-country-id');
    if (countryId) setActiveId(countryId);
  };

  const slideGames = (direction: -1 | 1) => {
    gameTrackRef.current?.scrollBy({ left: direction * 260, behavior: 'smooth' });
  };

  return (
    <section id="visited-coordinates" className="interactive-life" aria-label="Coordinates and after hours">
      <div className="interactive-section-heading">
        <div>
          <p className="interactive-kicker">Across The Map</p>
          <h2>Visited Coordinates</h2>
        </div>
        <a href="/post/visited-coordinates/">Travel notes →</a>
      </div>

      <div className="coordinate-console">
        <div className="interactive-map-panel">
          <div className="interactive-map-shell">
            {mapMarkup ? (
              <div
                ref={mapRef}
                className="interactive-map-canvas"
                onClick={selectMapRegion}
                aria-label="可点击的去过国家地图"
                dangerouslySetInnerHTML={{ __html: mapMarkup }}
              />
            ) : (
              <div ref={mapRef} className="interactive-map-canvas" aria-label="世界地图加载中">
                <img src="/world-map.svg" alt="世界地图" />
              </div>
            )}
            <span
              className="interactive-map-marker"
              style={{ '--marker-x': `${active.x}%`, '--marker-y': `${active.y}%` } as React.CSSProperties}
            >
              {active.en}
            </span>
          </div>
          <p className="interactive-map-status">Active coordinate: {active.en}</p>
        </div>

        <div className="coordinate-detail" aria-live="polite">
          <div className="coordinate-detail-head">
            <div><h3>{active.en} / {active.name}</h3><p>{active.region} coordinate</p></div>
            <strong><b>11</b> nodes</strong>
          </div>
          <div className="country-switcher">
            {countries.map((country) => (
              <button
                type="button"
                className={country.id === activeId ? 'is-active' : ''}
                onClick={() => setActiveId(country.id)}
                aria-pressed={country.id === activeId}
              >
                {country.en}
              </button>
            ))}
          </div>
          <div className="coordinate-postcard">
            <small>POSTCARD FROM {active.en.toUpperCase()}</small>
            <p>{active.note}</p>
          </div>
        </div>
      </div>

      <div id="board-game-deck" className="interactive-section-heading after-hours-heading">
        <div>
          <p className="interactive-kicker">Beyond Research</p>
          <h2>Board Game Deck</h2>
        </div>
        <div className="game-controls">
          <button type="button" onClick={() => slideGames(-1)} aria-label="向左滑动桌游展板">←</button>
          <button type="button" onClick={() => slideGames(1)} aria-label="向右滑动桌游展板">→</button>
        </div>
      </div>

      <div ref={gameTrackRef} className="game-track" aria-label="可横向滑动的桌游展板">
        {games.map((game, index) => (
          <article
            className={`game-card ${'image' in game ? 'game-card-with-cover' : 'game-card-symbolic'}`}
            style={{ '--game-color-a': game.colors[0], '--game-color-b': game.colors[1] } as React.CSSProperties}
          >
            <div className="game-cover">
              {'image' in game && game.image ? (
                <img src={game.image} alt={`${game.name} 封面`} loading="lazy" />
              ) : (
                <div className="game-symbol" aria-hidden="true">
                  <span>{'symbol' in game ? game.symbol : '◇'}</span>
                  <i></i><i></i><i></i>
                </div>
              )}
              <span className="game-number">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="game-card-body">
              <div><small>{game.type}</small><h3>{game.name}</h3></div>
              <p>{game.note}</p>
              {'href' in game && game.href && <a className="game-project-link" href={game.href}>Project details →</a>}
            </div>
          </article>
        ))}
      </div>

      <div id="sports-and-motion" className="interactive-section-heading sports-heading">
        <div>
          <p className="interactive-kicker">Stay In Motion</p>
          <h2>Sports &amp; Motion</h2>
        </div>
        <span className="sports-count">09 activities</span>
      </div>

      <div className="sports-grid" aria-label="运动项目列表">
        {sports.map((sport, index) => (
          <article className={`sport-card sport-tone-${sport.tone}`}>
            <div className="sport-card-inner">
              <div className="sport-card-face sport-card-front">
                <span className="sport-card-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="sport-icon">
                  <img src={sport.icon} alt="" loading="lazy" />
                </div>
              </div>
              <div className="sport-card-face sport-card-back">
                <span className="sport-card-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{sport.name}</strong>
                <span>{sport.en.toUpperCase()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <a className="after-hours-link" href="/post/after-hours/">Board games, sports and more →</a>
    </section>
  );
}
