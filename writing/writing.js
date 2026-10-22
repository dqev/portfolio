var copySvgIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

var checkSvgIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';

function fallbackCopy(text, cb) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    if (cb) cb();
  } catch (e) {}
  document.body.removeChild(ta);
}

function copyText(text, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
      fallbackCopy(text, onSuccess);
    });
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function initCodeCopy() {
  document.querySelectorAll('.blog-content pre').forEach(function (pre) {
    var code = pre.querySelector('code');
    if (code && code.parentNode === pre) {
      var wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.insertBefore(wrap, code);
      wrap.appendChild(code);
    }

    var preWrap = document.createElement('div');
    preWrap.className = 'pre-wrap';
    pre.parentNode.insertBefore(preWrap, pre);
    preWrap.appendChild(pre);

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML =
      '<span class="ci ci-copy">' + copySvgIcon + '</span>' +
      '<span class="ci ci-check">' + checkSvgIcon + '</span>';
    preWrap.appendChild(btn);

    btn.addEventListener('click', function () {
      var c = pre.querySelector('code');
      var text = (c ? c.textContent : pre.textContent).trim();

      btn.classList.add('is-copied');
      setTimeout(function () {
        btn.classList.remove('is-copied');
      }, 2000);

      copyText(text);
    });
  });
}

function initIconCopy() {
  document.querySelectorAll('.icon-copy-btn').forEach(function (btn) {
    if (btn.querySelector('.ci-check')) return;

    var copyWrap = document.createElement('span');
    copyWrap.className = 'ci-copy';
    var svg = btn.querySelector('svg');
    if (svg) copyWrap.appendChild(svg);

    var checkWrap = document.createElement('span');
    checkWrap.className = 'ci-check';
    checkWrap.innerHTML = checkSvgIcon;

    btn.appendChild(copyWrap);
    btn.appendChild(checkWrap);

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var card = btn.closest('.project-card');
      var icon = card ? card.querySelector('.project-card-icon-container svg') : null;
      if (!icon) return;

      btn.classList.add('is-copied');
      setTimeout(function () {
        btn.classList.remove('is-copied');
      }, 2000);

      copyText(icon.outerHTML);
    });
  });
}

function initBlogTOC() {
  const headings = Array.from(document.querySelectorAll('.blog-content h2'));
  const tocList = document.querySelector('.toc-list');

  if (!headings.length || !tocList) return;

  tocList.innerHTML = '';
  headings.forEach((h2, index) => {
    if (!h2.id) {
      const slug = h2.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'section-' + index;
      h2.id = slug;
    }

    const li = document.createElement('li');
    li.className = 'toc-item';
    const a = document.createElement('a');
    a.href = '#' + h2.id;
    a.className = 'toc-link';
    a.textContent = h2.textContent;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById(h2.id);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 40;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });

  const tocLinks = Array.from(tocList.querySelectorAll('.toc-link'));

  function updateActiveHeading() {
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
    let activeIndex = 0;

    if (isAtBottom) {
      activeIndex = headings.length - 1;
    } else {
      const scrollPos = window.scrollY + 140;
      for (let i = 0; i < headings.length; i++) {
        if (scrollPos >= headings[i].offsetTop) {
          activeIndex = i;
        } else {
          break;
        }
      }
    }

    tocLinks.forEach((link, idx) => {
      if (idx === activeIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveHeading, { passive: true });
  updateActiveHeading();
}

function initColorChips() {
  const codeElems = document.querySelectorAll('.blog-content code');
  const hexRegex = /^#([0-9a-fA-F]{3,8})$/;

  codeElems.forEach(function (el) {
    const text = el.textContent.trim();
    if (hexRegex.test(text)) {
      const chip = document.createElement('span');
      chip.className = 'color-hex-chip';

      const swatch = document.createElement('span');
      swatch.className = 'swatch';
      swatch.style.backgroundColor = text;

      const textSpan = document.createElement('span');
      textSpan.className = 'hex-text';
      textSpan.innerHTML = '<span class="hex-hash">#</span>' + text.slice(1);

      chip.appendChild(swatch);
      chip.appendChild(textSpan);

      if (el.parentNode) {
        el.parentNode.replaceChild(chip, el);
      }
    }
  });
}

var plusSvgIcon =
  '<svg class="faq-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function initFAQ() {
  document.querySelectorAll('.faq details summary').forEach(function (summary) {
    if (summary.querySelector('.faq-icon')) return;
    var wrapper = document.createElement('span');
    wrapper.innerHTML = plusSvgIcon;
    summary.appendChild(wrapper.firstChild);
  });
}

function initArticlePage() {
  initCodeCopy();
  initIconCopy();
  initBlogTOC();
  initColorChips();
  initFAQ();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initArticlePage);
} else {
  initArticlePage();
}
