// Shared SVG diagram rendering engine
// Included inline in each diagram HTML file

const NS = 'http://www.w3.org/2000/svg';
let svg, edgesGroup, nodesGroup, dotsGroup;

function initDiagram(svgId) {
  svg = document.getElementById(svgId);
  const defs = svg.querySelector('defs');

  for (const node of NODES) {
    const g = document.createElementNS(NS, 'linearGradient');
    g.setAttribute('id', 'grad-' + node.id);
    g.setAttribute('x1','0%'); g.setAttribute('y1','0%');
    g.setAttribute('x2','100%'); g.setAttribute('y2','100%');
    [[0, node.grad[0]], [100, node.grad[1]]].forEach(([off, col]) => {
      const s = document.createElementNS(NS, 'stop');
      s.setAttribute('offset', off + '%'); s.setAttribute('stop-color', col);
      g.appendChild(s);
    });
    defs.appendChild(g);
  }

  for (const sec of SECTIONS) drawSection(sec);

  edgesGroup = document.createElementNS(NS, 'g');
  nodesGroup = document.createElementNS(NS, 'g');
  dotsGroup  = document.createElementNS(NS, 'g');
  svg.appendChild(edgesGroup);
  svg.appendChild(nodesGroup);
  svg.appendChild(dotsGroup);

  for (const edge of EDGES) drawEdge(edge);
  for (const node of NODES) drawNode(node);
  for (const edge of EDGES) addDots(edge);
}

function drawSection(s) {
  const g = document.createElementNS(NS, 'g');
  const r = document.createElementNS(NS, 'rect');
  r.setAttribute('x', s.x);   r.setAttribute('y', s.y);
  r.setAttribute('width', s.w); r.setAttribute('height', s.h);
  r.setAttribute('rx', '14');
  r.setAttribute('fill',   s.fill   || 'rgba(255,255,255,0.02)');
  r.setAttribute('stroke', s.stroke || 'rgba(255,255,255,0.06)');
  r.setAttribute('stroke-width', '1');
  g.appendChild(r);
  const t = document.createElementNS(NS, 'text');
  t.setAttribute('x', s.x + 14); t.setAttribute('y', s.y + 17);
  t.setAttribute('fill',   s.labelColor || 'rgba(255,255,255,0.28)');
  t.setAttribute('font-size', '9.5'); t.setAttribute('font-weight', '700');
  t.setAttribute('font-family', 'system-ui,sans-serif');
  t.setAttribute('letter-spacing', '0.09em');
  t.textContent = s.label;
  g.appendChild(t);
  svg.insertBefore(g, svg.firstChild);
}

function getNode(id) { return NODES.find(n => n.id === id); }

function autoPath(n1, n2) {
  const x1 = n1.x, y1 = n1.y + 28;
  const x2 = n2.x, y2 = n2.y - 28;
  const my = (y1 + y2) / 2;
  if (Math.abs(x1 - x2) < 8) return `M ${x1},${y1} L ${x2},${y2}`;
  return `M ${x1},${y1} C ${x1},${my} ${x2},${my} ${x2},${y2}`;
}

function drawEdge(edge) {
  const n1 = getNode(edge.from), n2 = getNode(edge.to);
  const d = edge.path || autoPath(n1, n2);
  edge._d = d;
  const p = document.createElementNS(NS, 'path');
  p.setAttribute('d', d);
  p.setAttribute('stroke', edge.color);
  p.setAttribute('stroke-width', edge.dashed ? '1.5' : '1.8');
  p.setAttribute('fill', 'none');
  p.setAttribute('opacity', '0.4');
  if (edge.dashed) p.setAttribute('stroke-dasharray', '6,4');
  p.setAttribute('marker-end', 'url(#arrowhead)');
  edgesGroup.appendChild(p);
}

function drawNode(node) {
  const NW = node.w || 165, NH = node.h || 54;
  const g = document.createElementNS(NS, 'g');

  // glow halo
  const glo = document.createElementNS(NS, 'rect');
  glo.setAttribute('x', node.x-NW/2-4); glo.setAttribute('y', node.y-NH/2-4);
  glo.setAttribute('width', NW+8); glo.setAttribute('height', NH+8);
  glo.setAttribute('rx', '14'); glo.setAttribute('fill', 'none');
  glo.setAttribute('stroke', node.stroke); glo.setAttribute('stroke-width', '2');
  glo.setAttribute('opacity', '0.18'); glo.setAttribute('filter', 'url(#nglow)');
  g.appendChild(glo);

  // main rect
  const rect = document.createElementNS(NS, 'rect');
  rect.setAttribute('x', node.x-NW/2); rect.setAttribute('y', node.y-NH/2);
  rect.setAttribute('width', NW); rect.setAttribute('height', NH);
  rect.setAttribute('rx', '11');
  rect.setAttribute('fill', `url(#grad-${node.id})`);
  rect.setAttribute('stroke', node.stroke); rect.setAttribute('stroke-width', '1.6');
  rect.setAttribute('filter', 'url(#shadow)');
  g.appendChild(rect);

  // label
  const lbl = document.createElementNS(NS, 'text');
  lbl.setAttribute('x', node.x); lbl.setAttribute('y', node.y - (node.sub ? 7 : 5));
  lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('fill', '#FFFFFF');
  lbl.setAttribute('font-size', node.fs || '12.5'); lbl.setAttribute('font-weight', '700');
  lbl.setAttribute('font-family', 'system-ui,sans-serif');
  lbl.textContent = node.label;
  g.appendChild(lbl);

  if (node.sub) {
    const sub = document.createElementNS(NS, 'text');
    sub.setAttribute('x', node.x); sub.setAttribute('y', node.y + 10);
    sub.setAttribute('text-anchor', 'middle'); sub.setAttribute('fill', 'rgba(255,255,255,0.58)');
    sub.setAttribute('font-size', '9'); sub.setAttribute('font-family', 'system-ui,sans-serif');
    sub.textContent = node.sub;
    g.appendChild(sub);
  }
  nodesGroup.appendChild(g);
}

function addDots(edge) {
  const d = edge._d;
  const count = edge.dots || 2;
  for (let i = 0; i < count; i++) {
    // outer glow circle
    const og = document.createElementNS(NS, 'circle');
    og.setAttribute('r', '8'); og.setAttribute('fill', edge.color); og.setAttribute('opacity', '0.2');
    og.setAttribute('filter', 'url(#glow)');
    const am0 = document.createElementNS(NS, 'animateMotion');
    am0.setAttribute('dur', `${edge.dur}s`);
    am0.setAttribute('begin', `${(edge.begin||0) + i*(edge.dur/count)}s`);
    am0.setAttribute('repeatCount', 'indefinite');
    am0.setAttribute('path', d);
    am0.setAttribute('calcMode', 'spline');
    am0.setAttribute('keyTimes', '0;1');
    am0.setAttribute('keySplines', '0.42 0 0.58 1');
    og.appendChild(am0); dotsGroup.appendChild(og);

    // bright dot
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', '4.5'); c.setAttribute('fill', edge.color); c.setAttribute('opacity', '0.95');
    c.setAttribute('filter', 'url(#glow)');
    const am = document.createElementNS(NS, 'animateMotion');
    am.setAttribute('dur', `${edge.dur}s`);
    am.setAttribute('begin', `${(edge.begin||0) + i*(edge.dur/count)}s`);
    am.setAttribute('repeatCount', 'indefinite');
    am.setAttribute('path', d);
    am.setAttribute('calcMode', 'spline');
    am.setAttribute('keyTimes', '0;1');
    am.setAttribute('keySplines', '0.42 0 0.58 1');
    c.appendChild(am); dotsGroup.appendChild(c);
  }
}
