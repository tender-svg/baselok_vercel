/**
 * BaseLok Site Search - search.js
 * Standalone, CMS-independent full-screen search overlay.
 * This file must NEVER have data-cms attributes or be CMS-editable.
 */

(function () {
    'use strict';

    // ─────────────────────────────────────────────
    // SEARCH INDEX
    // ─────────────────────────────────────────────
    let SEARCH_INDEX = [
        { type: 'Page', icon: 'fa-home', title: 'Homepage', desc: 'BaseLok — Over 6 decades of proven geosynthetic technology.', tags: ['home', 'homepage', 'baselok'], url: 'index.html' },
        { type: 'Page', icon: 'fa-th', title: 'Solutions Overview', desc: 'Explore all BaseLok geosynthetic product solutions.', tags: ['solutions', 'products', 'overview'], url: 'solutions.html' },
        { type: 'Page', icon: 'fa-th-list', title: 'Applications Overview', desc: 'Browse all geosynthetic application categories.', tags: ['applications', 'categories'], url: 'applications.html' },
        { type: 'Page', icon: 'fa-phone', title: 'Support & Contact', desc: 'Contact BaseLok technical support or request a quote.', tags: ['contact', 'support', 'quote'], url: 'contact.html' },
    ];

    async function loadDynamicIndex() {
        try {
            const response = await fetch('/api/v2/search/index');
            if (!response.ok) throw new Error('Search index load failed');
            const dynamicItems = await response.json();
            
            // Filter out existing URLs to avoid duplicates
            const staticUrls = new Set(SEARCH_INDEX.map(item => item.url));
            const filteredDynamic = dynamicItems.filter(item => !staticUrls.has(item.url));
            
            SEARCH_INDEX = [...SEARCH_INDEX, ...filteredDynamic];
            console.log(`[Search] Loaded ${dynamicItems.length} dynamic items.`);
        } catch (err) {
            console.warn('[Search] Failed to load dynamic index, using fallback static pages.', err);
        }
    }

    const TYPE_COLORS = {
        'Solution':      '#d11f26',
        'Application':   '#1a5fa8',
        'Case Study': '#28a745',
        'Resource':      '#7b2d8b',
        'Page':          '#555',
    };

    const QUICK_LINKS = [
        { label: 'Solutions',      icon: 'fa-cube',        url: 'solutions.html' },
        { label: 'Applications',   icon: 'fa-th-large',    url: 'applications.html' },
        { label: 'Project Highlights',icon: 'fa-star',        url: 'case-studies.html' },
        { label: 'Resources',      icon: 'fa-folder-open', url: 'resources.html' },
        { label: 'Contact',        icon: 'fa-phone',       url: 'contact.html' },
    ];

    // ─────────────────────────────────────────────
    // SEARCH LOGIC
    // ─────────────────────────────────────────────
    function doSearch(query) {
        if (!query || query.trim().length < 2) return [];
        const q = query.toLowerCase().trim();
        const words = q.split(/\s+/);

        return SEARCH_INDEX
            .map(item => {
                let score = 0;
                const title = item.title.toLowerCase();
                const type = item.type.toLowerCase();
                const desc = (item.desc || '').toLowerCase();

                words.forEach(word => {
                    // Exact Title Match (Bonus)
                    if (title === word) score += 50;
                    // Title Starts With (Bonus)
                    else if (title.startsWith(word)) score += 25;
                    // Title Includes
                    else if (title.includes(word)) score += 10;

                    if (type.includes(word)) score += 5;
                    if (desc.includes(word)) score += 3;

                    (item.tags || []).forEach(tag => {
                        const t = tag.toLowerCase();
                        if (t === word) score += 15;
                        else if (t.includes(word)) score += 4;
                    });
                });
                return { item, score };
            })
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 9)
            .map(r => r.item);
    }

    function highlight(text, query) {
        const words = (query || '').trim().split(/\s+/).filter(w => w.length > 1);
        let result = text;
        words.forEach(word => {
            const re = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            result = result.replace(re, '<mark style="background:#fff3a3;border-radius:2px;padding:0 1px;color:#000;">$1</mark>');
        });
        return result;
    }

    // ─────────────────────────────────────────────
    // OVERLAY BUILD
    // ─────────────────────────────────────────────
    function buildOverlay() {
        if (document.getElementById('blk-search-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'blk-search-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.97);
            z-index: 2147483647;
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease;
            font-family: 'Rubik', 'Segoe UI', Arial, sans-serif;
            overflow: hidden;
        `;

        overlay.innerHTML = `
            <!-- TOP BAR: always visible -->
            <div id="blk-search-topbar" style="
                width: 100%;
                background: rgba(255,255,255,0.04);
                border-bottom: 1px solid rgba(255,255,255,0.08);
                padding: 20px 40px;
                display: flex;
                align-items: center;
                gap: 16px;
                flex-shrink: 0;
                backdrop-filter: blur(8px);
            ">
                <i class="fa fa-search" style="color:#d11f26;font-size:1.3rem;flex-shrink:0;"></i>
                <input
                    id="blk-search-input"
                    type="text"
                    placeholder="Search solutions, applications, resources..."
                    autocomplete="off"
                    spellcheck="false"
                    style="
                        flex: 1;
                        background: transparent;
                        border: none;
                        outline: none;
                        color: #fff;
                        font-size: 1.35rem;
                        font-weight: 400;
                        font-family: inherit;
                        caret-color: #d11f26;
                        min-width: 0;
                    "
                />
                <button id="blk-search-clear" style="
                    background: rgba(255,255,255,0.08);
                    border: none;
                    color: #aaa;
                    font-size: 0.75rem;
                    font-weight: 700;
                    padding: 6px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: inherit;
                    display: none;
                    transition: background 0.2s;
                ">CLEAR</button>
                <button id="blk-search-close" title="Close (Esc)" style="
                    background: rgba(255,255,255,0.08);
                    border: none;
                    color: #ccc;
                    font-size: 1.1rem;
                    width: 38px;
                    height: 38px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                    flex-shrink: 0;
                "><i class="fa fa-times"></i></button>
            </div>

            <!-- SCROLLABLE RESULTS AREA -->
            <div id="blk-search-body" style="
                flex: 1;
                width: 100%;
                overflow-y: auto;
                padding: 0 40px 40px;
                max-width: 900px;
                align-self: center;
                box-sizing: border-box;
            ">
                <!-- Default State: Quick Links -->
                <div id="blk-search-default">
                    <p style="color:#aaa; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:2px; margin:28px 0 16px;">Quick Links</p>
                    <div style="display:flex; flex-wrap:wrap; gap:10px;">
                        ${QUICK_LINKS.map(l => `
                            <a href="${l.url}" style="
                                display:inline-flex;align-items:center;gap:8px;
                                background:rgba(255,255,255,0.06);
                                color:#e0e0e0;
                                text-decoration:none;
                                border:1px solid rgba(255,255,255,0.1);
                                border-radius:8px;
                                padding:10px 18px;
                                font-size:0.88rem;
                                font-weight:600;
                                transition:background 0.2s, border-color 0.2s;
                                font-family:inherit;
                            " onmouseover="this.style.background='rgba(209,31,38,0.2)';this.style.borderColor='#d11f26';" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.borderColor='rgba(255,255,255,0.1)';">
                                <i class="fa ${l.icon}" style="color:#d11f26;"></i> ${l.label}
                            </a>
                        `).join('')}
                    </div>
                    <p id="blk-search-hints" style="color:#555; font-size:0.78rem; margin-top:36px; text-align:center;">
                        Try searching: 
                        <span style="color:#d11f26; cursor:pointer; text-decoration:underline; margin:0 5px;" onclick="window._blkSearchTrigger('geogrid')">"geogrid"</span>
                        <span style="color:#d11f26; cursor:pointer; text-decoration:underline; margin:0 5px;" onclick="window._blkSearchTrigger('roadways')">"roadways"</span>
                        <span style="color:#d11f26; cursor:pointer; text-decoration:underline; margin:0 5px;" onclick="window._blkSearchTrigger('marine')">"marine"</span>
                        <span style="color:#d11f26; cursor:pointer; text-decoration:underline; margin:0 5px;" onclick="window._blkSearchTrigger('erosion')">"erosion"</span>
                    </p>
                </div>

                <!-- Suggestions State -->
                <div id="blk-search-suggestions" style="display:none; margin-top:20px;">
                    <p style="color:#d11f26; font-size:0.7rem; font-weight:800; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:12px;">Quick Suggestions</p>
                    <div id="blk-suggestion-list" style="display:flex; flex-wrap:wrap; gap:8px;"></div>
                </div>

                <!-- Results State -->
                <div id="blk-search-results" style="display:none;">
                    <div id="blk-search-meta" style="color:#555; font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:2px; margin:28px 0 14px;"></div>
                    <div id="blk-search-list"></div>
                    <div id="blk-search-empty" style="display:none; text-align:center; padding:60px 20px;">
                        <i class="fa fa-search" style="font-size:3rem; color:#2a3550; display:block; margin-bottom:16px;"></i>
                        <p style="color:#666; font-size:1rem; font-weight:600; margin:0 0 6px;">No results found</p>
                        <p style="color:#444; font-size:0.85rem; margin:0;">Try a different keyword or browse the quick links above</p>
                    </div>
                </div>
            </div>

            <!-- HINT BAR -->
            <div style="
                flex-shrink:0;
                padding:12px 40px;
                border-top:1px solid rgba(255,255,255,0.05);
                display:flex;
                gap:24px;
                width:100%;
                box-sizing:border-box;
            ">
                <span style="color:#333;font-size:0.72rem;">
                    <kbd style="background:#1e293b;color:#aaa;border:1px solid #334;border-radius:4px;padding:1px 6px;font-size:0.7rem;">↑↓</kbd>&nbsp; Navigate
                </span>
                <span style="color:#333;font-size:0.72rem;">
                    <kbd style="background:#1e293b;color:#aaa;border:1px solid #334;border-radius:4px;padding:1px 6px;font-size:0.7rem;">Enter</kbd>&nbsp; Open
                </span>
                <span style="color:#333;font-size:0.72rem;">
                    <kbd style="background:#1e293b;color:#aaa;border:1px solid #334;border-radius:4px;padding:1px 6px;font-size:0.7rem;">Esc</kbd>&nbsp; Close
                </span>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // ─────────────────────────────────────────────
    // RENDER RESULTS
    // ─────────────────────────────────────────────
    function renderResults(query) {
        const resultsWrap = document.getElementById('blk-search-results');
        const defaultWrap = document.getElementById('blk-search-default');
        const meta        = document.getElementById('blk-search-meta');
        const list        = document.getElementById('blk-search-list');
        const emptyMsg    = document.getElementById('blk-search-empty');
        const clearBtn    = document.getElementById('blk-search-clear');

        if (!query || query.trim().length < 2) {
            resultsWrap.style.display = 'none';
            defaultWrap.style.display = 'block';
            if (clearBtn) clearBtn.style.display = 'none';
            return;
        }

        if (clearBtn) clearBtn.style.display = 'inline-flex';
        resultsWrap.style.display = 'block';
        defaultWrap.style.display = 'none';

        const results = doSearch(query);
        const suggestionWrap = document.getElementById('blk-search-suggestions');
        const suggestionList = document.getElementById('blk-suggestion-list');

        if (!results.length) {
            list.innerHTML = '';
            suggestionWrap.style.display = 'none';
            emptyMsg.style.display = 'block';
            meta.textContent = `No results for "${query}"`;
            return;
        }

        // Handle Suggestions (Top 3 matches)
        const suggestions = results.filter(r => r.score >= 10).slice(0, 3);
        if (suggestions.length > 0) {
            suggestionWrap.style.display = 'block';
            suggestionList.innerHTML = suggestions.map(s => `
                <button onclick="location.href='${s.url}'" style="
                    background: rgba(209,31,38,0.1);
                    border: 1px solid rgba(209,31,38,0.3);
                    color: #fff;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.background='rgba(209,31,38,0.3)'" onmouseout="this.style.background='rgba(209,31,38,0.1)'">
                    <i class="fa ${s.icon}" style="margin-right:5px;"></i> ${s.title}
                </button>
            `).join('');
        } else {
            suggestionWrap.style.display = 'none';
        }

        emptyMsg.style.display = 'none';
        meta.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;

        list.innerHTML = results.map((item, i) => `
            <a href="${item.url}" class="blk-sr-item" tabindex="0" style="
                display:flex;
                align-items:center;
                gap:16px;
                padding:16px 20px;
                border-radius:12px;
                text-decoration:none;
                color:#e0e0e0;
                margin-bottom:6px;
                background:rgba(255,255,255,0.03);
                border:1px solid rgba(255,255,255,0.05);
                transition:background 0.18s,border-color 0.18s,transform 0.12s;
                outline:none;
                animation: blkFadeIn 0.2s ease ${i * 40}ms both;
            "
            onmouseover="this.style.background='rgba(209,31,38,0.12)';this.style.borderColor='rgba(209,31,38,0.3)';this.style.transform='translateX(4px)';"
            onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='rgba(255,255,255,0.05)';this.style.transform='translateX(0)';"
            onfocus="this.style.background='rgba(209,31,38,0.12)';this.style.borderColor='rgba(209,31,38,0.4)';"
            onblur="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='rgba(255,255,255,0.05)';"
            >
                <div style="
                    width:44px;height:44px;flex-shrink:0;
                    background:${TYPE_COLORS[item.type]}22;
                    border-radius:10px;
                    display:flex;align-items:center;justify-content:center;
                    border:1px solid ${TYPE_COLORS[item.type]}44;
                ">
                    <i class="fa ${item.icon}" style="color:${TYPE_COLORS[item.type]};font-size:1.1rem;"></i>
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
                        <span style="
                            background:${TYPE_COLORS[item.type]};
                            color:#fff;font-size:0.58rem;font-weight:800;
                            padding:2px 9px;border-radius:20px;
                            text-transform:uppercase;letter-spacing:0.5px;
                            flex-shrink:0;
                        ">${item.type}</span>
                        <span style="font-weight:700;font-size:0.98rem;color:#fff;">
                            ${highlight(item.title, query)}
                        </span>
                    </div>
                    <div style="font-size:0.8rem;color:#7a8fa6;line-height:1.45;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">
                        ${highlight(item.desc, query)}
                    </div>
                </div>
                <i class="fa fa-chevron-right" style="color:#333;font-size:0.8rem;flex-shrink:0;"></i>
            </a>
        `).join('');
    }

    // ─────────────────────────────────────────────
    // OPEN / CLOSE
    // ─────────────────────────────────────────────
    function openOverlay() {
        buildOverlay();
        loadDynamicIndex(); // Refresh or load if missed
        const overlay = document.getElementById('blk-search-overlay');
        const input   = document.getElementById('blk-search-input');
        if (!overlay) return;

        overlay.style.pointerEvents = 'all';
        overlay.style.opacity = '1';
        document.body.style.overflow = 'hidden';
        setTimeout(() => { if (input) input.focus(); }, 80);
        bindOverlayEvents();
    }

    function closeOverlay() {
        const overlay = document.getElementById('blk-search-overlay');
        const input   = document.getElementById('blk-search-input');
        if (!overlay) return;
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        document.body.style.overflow = '';
        if (input) {
            setTimeout(() => {
                input.value = '';
                renderResults('');
            }, 250);
        }
    }

    function bindOverlayEvents() {
        const overlay  = document.getElementById('blk-search-overlay');
        const input    = document.getElementById('blk-search-input');
        const closeBtn = document.getElementById('blk-search-close');
        const clearBtn = document.getElementById('blk-search-clear');

        // Already bound
        if (overlay._bound) return;
        overlay._bound = true;

        // Live search as user types
        let timer;
        input.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(() => renderResults(input.value.trim()), 200);
        });

        // Submit with Enter
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { closeOverlay(); return; }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const first = document.querySelector('.blk-sr-item');
                if (first) first.focus();
            }
        });

        // Result list keyboard nav
        overlay.addEventListener('keydown', function (e) {
            const focused = document.activeElement;
            if (!focused || !focused.classList.contains('blk-sr-item')) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = focused.nextElementSibling;
                if (next && next.classList.contains('blk-sr-item')) next.focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = focused.previousElementSibling;
                if (prev && prev.classList.contains('blk-sr-item')) prev.focus();
                else if (input) input.focus();
            }
            if (e.key === 'Escape') closeOverlay();
        });

        closeBtn.addEventListener('click', closeOverlay);
        clearBtn.addEventListener('click', function () {
            input.value = '';
            renderResults('');
            input.focus();
        });

        // Click on backdrop (outside topbar) closes
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeOverlay();
        });

        closeBtn.addEventListener('mouseover', () => closeBtn.style.background = 'rgba(209,31,38,0.3)');
        closeBtn.addEventListener('mouseout',  () => closeBtn.style.background = 'rgba(255,255,255,0.08)');
    }

    // Inject keyframe animation
    function injectStyles() {
        if (document.getElementById('blk-search-styles')) return;
        const style = document.createElement('style');
        style.id = 'blk-search-styles';
        style.textContent = `
            @keyframes blkFadeIn {
                from { opacity:0; transform: translateY(8px); }
                to   { opacity:1; transform: translateY(0); }
            }
            #blk-search-input::placeholder { color: rgba(255,255,255,0.25); }
            #blk-search-body::-webkit-scrollbar { width: 6px; }
            #blk-search-body::-webkit-scrollbar-track { background: transparent; }
            #blk-search-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        `;
        document.head.appendChild(style);
    }

    // ─────────────────────────────────────────────
    // INIT — Hijack the search button
    // ─────────────────────────────────────────────
    function init() {
        injectStyles();
        loadDynamicIndex();

        const searchBtn  = document.querySelector('.header_search .search_btn');
        const nativeForm = document.getElementById('searchbox');

        if (!searchBtn && !nativeForm) return;

        // Replace native search button click with our overlay
        if (searchBtn) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                openOverlay();
            }, true);
        }

        // Also intercept form submit in case native form is used
        if (nativeForm) {
            nativeForm.addEventListener('submit', function (e) {
                e.preventDefault();
                openOverlay();
            });
        }

        // Global keyboard shortcut: / or Ctrl+K to open search
        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openOverlay();
            }
            if (e.key === 'Escape') {
                closeOverlay();
            }
        });
    }

    // Global trigger for clickable hints
    window._blkSearchTrigger = function(val) {
        const input = document.getElementById('blk-search-input');
        if (input) {
            input.value = val;
            renderResults(val);
            input.focus();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
