// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Animated counters for stat numbers
  var counted = false;
  function runCounters() {
    if (counted) return;
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var dur = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.floor(p * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(step);
    });
    counted = true;
  }

  var trigger = document.querySelector('[data-count]');
  if (trigger && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) runCounters(); });
    }, { threshold: 0.4 });
    obs.observe(trigger.closest('section') || trigger);
  } else {
    runCounters();
  }

  // ---------- Build galleries from OH_DATA ----------
  var D = window.OH_DATA || { activities: [], associations: [], chapters: [] };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function photoTile(src, cap, ratio) {
    return '<div class="photo" style="aspect-ratio:' + ratio + '">' +
      '<img src="' + src + '" alt="' + esc(cap || 'Operation Hypify activity') + '" loading="lazy">' +
      (cap ? '<span class="cap">' + esc(cap) + '</span>' : '') + '</div>';
  }

  var stripCaps = ['Students building at a STEM workshop', 'A hands-on lesson in action', 'Young innovators exploring science'];
  var strip = document.getElementById('home-strip');
  if (strip) D.activities.slice(0, 3).forEach(function (src, i) {
    strip.insertAdjacentHTML('beforeend', photoTile(src, stripCaps[i] || '', '16/10'));
  });

  var actg = document.getElementById('act-gallery');
  if (actg) D.activities.forEach(function (src) { actg.insertAdjacentHTML('beforeend', photoTile(src, '', '4/3')); });

  var jact = document.getElementById('join-activities');
  if (jact) D.activities.slice(0, 4).forEach(function (src) { jact.insertAdjacentHTML('beforeend', photoTile(src, '', '4/3')); });

  var aact = document.getElementById('about-activities');
  if (aact) D.activities.slice(3, 7).forEach(function (src) { aact.insertAdjacentHTML('beforeend', photoTile(src, '', '4/3')); });

  var vact = document.getElementById('vol-activities');
  if (vact) D.activities.slice(0, 3).forEach(function (src) { vact.insertAdjacentHTML('beforeend', photoTile(src, '', '4/3')); });

  var ag = document.getElementById('assoc-grid');
  if (ag) D.associations.forEach(function (a) {
    ag.insertAdjacentHTML('beforeend', '<div class="assoc-chip"><img src="' + a.img + '" alt="' + esc(a.name) + '" title="' + esc(a.name) + '" loading="lazy"></div>');
  });

  var cg = document.getElementById('chapter-gallery');
  if (cg) D.chapters.forEach(function (c) {
    cg.insertAdjacentHTML('beforeend',
      '<div class="chapter-card"><div class="logo-box"><img src="' + c.img + '" alt="' + esc(c.name) + '" loading="lazy"></div>' +
      '<div class="cname">' + esc(c.name) + '</div>' +
      (c.location ? '<div class="cloc">' + esc(c.location) + '</div>' : '') + '</div>');
  });
});
