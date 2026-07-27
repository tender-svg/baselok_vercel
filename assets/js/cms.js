/**
 * CMS Frontend Javascript - FULL DASHBOARD INTEGRATION
 * Handles real-time editing and comprehensive CMS dashboard
 */


const CMS_SITE_PAGES = [
    { file: 'index.html', title: 'Homepage' },
    { file: 'solutions.html', title: 'Solutions' },
    { file: 'case-studies.html', title: 'Project Highlights' },
    { file: 'resources.html', title: 'Resources' },
    { file: 'applications.html', title: 'Applications' },
    { file: 'support.html', title: 'Support' },
    { file: 'contact-us.html', title: 'Contact Us' }
];

const CMS_SOL_GROUPS = {
    "Roadways, Surfaces Paved & Unpaved": ["Subgrade Stabilization", "Flexible Pavement", "Heavy Duty Roadways", "Crane Pad"],
    "Walls, Slopes, Embankments": ["Retaining Walls", "Reinforced Slopes", "Reinforced Embankments"],
    "Railway": ["Reinforce Ballast", "Rail Infrastructure", "Ballast Fouling"],
    "Structure & Foundation Support": ["Bearing Capacity", "Settlement Reduction", "Structural Integrity", "Aggregate Reduction", "Crane Pad Working Platforms"],
    "Marine": ["Marine Scour", "Marine Resources", "Ecosystem Preservation"],
    "Environmental Enhancements": ["Living Shoreline", "Slope Protection", "Waterway Erosion", "Bridge Scour"]
};

// Flattened list for internal lookups if needed
const CMS_SOL_CATEGORIES = Object.values(CMS_SOL_GROUPS).flat();

const CMS_ALL_PAGES = [
    ...CMS_SITE_PAGES,
    // Main Application Pages
    { file: 'application-roadways.html', title: 'App: Roadways' },
    { file: 'application-walls-slopes.html', title: 'App: Walls & Slopes' },
    { file: 'application-railways.html', title: 'App: Railways' },
    { file: 'application-structure-foundation-support.html', title: 'App: Structure & Foundation Support' },
    { file: 'application-marine.html', title: 'App: Marine' },
    { file: 'application-environmental.html', title: 'App: Environmental Enhancements' },
    
    // Sub-Application Pages - Roadways
    { file: 'sub-roadways-subgrade-stabilization.html', title: 'Sub: Roadways - Subgrade Stabilization' },
    { file: 'sub-roadways-flexible-pavement-reinforcement.html', title: 'Sub: Roadways - Flexible Pavement' },
    { file: 'sub-roadways-crane-pad.html', title: 'Sub: Roadways - Crane Pad' },
    { file: 'sub-roadways-heavy-duty-surfaces.html', title: 'Sub: Roadways - Heavy Duty Surfaces' },

    // Sub-Application Pages - Walls & Slopes
    { file: 'sub-walls-slopes-retaining-walls.html', title: 'Sub: Walls & Slopes - Retaining Walls' },
    { file: 'sub-walls-slopes-reinforced-slopes.html', title: 'Sub: Walls & Slopes - Reinforced Slopes' },
    { file: 'sub-walls-slopes-reinforced-embankments.html', title: 'Sub: Walls & Slopes - Reinforced Embankments' },

    // Sub-Application Pages - Railways
    { file: 'sub-railways-ballast-fouling-prevention.html', title: 'Sub: Railways - Ballast Fouling Prevention' },
    { file: 'sub-railways-ballast-reinforcement.html', title: 'Sub: Railways - Ballast Reinforcement' },
    { file: 'sub-railways-rail-infrastructure-protection.html', title: 'Sub: Railways - Rail Infrastructure' },

    // Sub-Application Pages - Structure & Foundation
    { file: 'sub-structure-increased-bearing-capacity.html', title: 'Sub: Structure - Bearing Capacity' },
    { file: 'sub-structure-reduction-differential-settlement.html', title: 'Sub: Structure - Settlement Reduction' },
    { file: 'sub-structure-enhanced-structural-integrity.html', title: 'Sub: Structure - Structural Integrity' },
    { file: 'sub-structure-reduction-aggregate.html', title: 'Sub: Structure - Aggregate Reduction' },

    // Sub-Application Pages - Marine
    { file: 'sub-marine-extreme-scour-protection.html', title: 'Sub: Marine - Extreme Scour Protection' },
    { file: 'sub-marine-protection-resources.html', title: 'Sub: Marine - Protection Resources' },
    { file: 'sub-marine-ecosystem-rehabilitation.html', title: 'Sub: Marine - Ecosystem Rehabilitation' },

    // Sub-Application Pages - Environmental
    { file: 'sub-environmental-living-shorelines.html', title: 'Sub: Environmental - Living Shorelines' },
    { file: 'sub-environmental-slopes-embankments.html', title: 'Sub: Environmental - Slopes & Embankments' },
    { file: 'sub-environmental-waterway-erosion.html', title: 'Sub: Environmental - Waterway Erosion' },

    // Market Pages (17 pages)
    { file: 'market-roadways.html', title: 'Market: Roadways' },
    { file: 'market-railways.html', title: 'Market: Railways' },
    { file: 'market-ports-intermodal.html', title: 'Market: Ports & Intermodal' },
    { file: 'market-petrochemical.html', title: 'Market: Petrochemical' },
    { file: 'market-renewable-energy.html', title: 'Market: Renewable Energy' },
    { file: 'market-waste-management.html', title: 'Market: Waste Management' },
    { file: 'market-airports.html', title: 'Market: Airports' },
    { file: 'market-coastal-marine.html', title: 'Market: Coastal & Marine' },
    { file: 'market-commercial-residential.html', title: 'Market: Commercial & Residential' },
    { file: 'market-data-centers.html', title: 'Market: Data Centers' },
    { file: 'market-electrical-distribution.html', title: 'Market: Electrical Distribution' },
    { file: 'market-federal-epa-hazmat.html', title: 'Market: Federal / EPA / Hazmat' },
    { file: 'market-government-infrastructure.html', title: 'Market: Government Infrastructure' },
    { file: 'market-industrial.html', title: 'Market: Industrial' },
    { file: 'market-military.html', title: 'Market: Military' },
    { file: 'market-mining.html', title: 'Market: Mining' },
    { file: 'market-oil-and-gas.html', title: 'Market: Oil & Gas' },

    // Story / Case Study Pages
    { file: 'case-study-ballastguard.html', title: 'Story: BallastGuard' },
    { file: 'case-study-marine.html', title: 'Story: Marine' },
    { file: 'case-study-siltguard.html', title: 'Story: SiltGuard' },
    { file: 'case-study-baselok-sss.html', title: 'Story: BaseLok SSS' },

    // Blog & Webinar Pages
    { file: 'blog-details.html', title: 'Template: Blog/Webinar' },
    { file: 'blog-geogrid.html', title: 'Blog: GeoGrid Stabilization' },
    { file: 'blog-geocell.html', title: 'Blog: GeoCell Confinement' },
    { file: 'blog-fabgrid.html', title: 'Blog: FabGrid Composite' }
];

const CMS_PRODUCTS = [
    { label: 'GeoGrid', value: 'GeoGrid' },
    { label: 'FabGrid', value: 'FabGrid' },
    { label: 'GeoCell', value: 'GeoCell' },
    { label: 'FPS (Foundation Performance System)', value: 'FPS' },
    { label: 'BallastGuard', value: 'BallastGuard' },
    { label: 'Marine Products', value: 'Marine' }
];

// Default thumbnail per category-tab + product family Ã¢â‚¬&rdquo; auto-applied to new resources.
// Structure: RESOURCE_DEFAULT_THUMBS[document_type][product] = image URL
const RESOURCE_DEFAULT_THUMBS = {
    // TECHNICAL DATASHEETS tab
    'pane-docs': {
        'GeoGrid': 'https://office.qpaix.com/virtual/Baselok/images/OTHERS/1781210487535_Screenshot_2026-06-12_020817.png',
        'FabGrid': 'https://office.qpaix.com/virtual/Baselok/images/OTHERS/1781210578314_Screenshot_2026-06-12_020109.png',
        'GeoCell': 'https://office.qpaix.com/virtual/Baselok/images/OTHERS/1781209976265_Screenshot_2026-06-12_020244.png',
        'BallastGuard': 'https://office.qpaix.com/virtual/Baselok/images/OTHERS/1781210475984_Screenshot_2026-06-12_020502.png',
        'Marine': 'https://office.qpaix.com/virtual/Baselok/images/OTHERS/1781210495587_Screenshot_2026-06-12_020910.png',
        'FPS': '/images/defaults/fps_techdoc.svg'
    },
    // DOWNLOADS tab Ã¢â‚¬&rdquo; branded banners generated locally as SVG
    'pane-downloads': {
        'GeoGrid': '/images/defaults/geogrid_downloads.svg',
        'FabGrid': '/images/defaults/fabgrid_downloads.svg',
        'GeoCell': '/images/defaults/geocell_downloads.svg',
        'BallastGuard': '/images/defaults/ballastguard_downloads.svg',
        'Marine': '/images/defaults/marine_downloads.svg',
        'FPS': '/images/defaults/fps_downloads.svg'
    }
};

const CMS = {
    isLoggedIn: false,
    currentPage: null,
    pendingChanges: {},
    isEditing: false,

    sanitizeHtmlField(val) {
        if (typeof val !== 'string') return val;
        let clean = val.replace(/\s*contenteditable=(['"])true\1/gi, '');
        clean = clean.replace(/\s*style=(["'])(.*?)\1/gi, (match, quote, styleContent) => {
            let cleaned = styleContent
                .replace(/outline:\s*[^;]+;?/gi, '')
                .replace(/cursor:\s*[^;]+;?/gi, '')
                .replace(/display:\s*inline-block;?/gi, '')
                .replace(/padding:\s*2px;?/gi, '');
            cleaned = cleaned.trim();
            return cleaned === '' ? '' : ` style=${quote}${cleaned}${quote}`;
        });
        
        // Auto-format trademark symbols to superscript whenever content is loaded from DB
        clean = clean.replace(/<sup>\u00AE<\/sup>|<sup>&reg;<\/sup>/gi, '\u00AE')
                     .replace(/<sup>\u2122<\/sup>|<sup>&trade;<\/sup>/gi, '\u2122')
                     .replace(/\u00AE|&reg;/gi, '<sup>&reg;</sup>')
                     .replace(/\u2122|&trade;/gi, '<sup>&trade;</sup>');
                     
        return clean;
    },

    setupEditControls() {
        // Edit controls are set up via enableEditing() ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â no additional action needed here
    },
    history: [],
    activeResCategory: 'pane-downloads', // Default category for dashboard
    activeResProductFilter: '',          // '' = show all products
    translations: {},              // Cache for translations
    currentEditId: null,           // Tracking ID for item being edited
    currentEditTab: null,          // Tracking tab for item being edited
    // v2 State: Holds structured data from the new relational DB
    state: {
        solutions: [],
        applications: [],
        stories: [],
        resources: [],
        activeFilter: 'all' // Track active product filter
    },
    isSaving: false, // Flag to suppress beforeunload warning during intentional saves
    // -- MULTI-TAB SESSION SYNC --
    // Uses BroadcastChannel to sync sessionStorage flag from existing tabs to new tabs.
    // This allows "stay logged in on new tab" while still allowing "logout on all tabs closed".
    async syncSessionWithOtherTabs() {
        return new Promise((resolve) => {
            if (sessionStorage.getItem('cms_tab_session') === 'active') {
                this.setupSessionBroadcast(); // Already active, just start listening
                resolve();
                return;
            }

            const channel = new BroadcastChannel('cms_session_sync');
            let resolved = false;

            channel.onmessage = (msg) => {
                if (msg.data === 'session_active') {
                    console.log('[CMS] Session synced from another tab.');
                    sessionStorage.setItem('cms_tab_session', 'active');
                    this.setupSessionBroadcast();
                    if (!resolved) { resolved = true; resolve(); }
                }
            };

            // Ask other tabs if they have a session
            channel.postMessage('check_session');

            // Wait 200ms for any tab to reply. If no one replies, we are fresh.
            setTimeout(() => {
                if (!resolved) {
                    console.log('[CMS] No other active tabs found.');
                    this.setupSessionBroadcast(); // Start listening anyway for future tabs
                    resolve();
                }
            }, 250);
        });
    },

    setupSessionBroadcast() {
        const channel = new BroadcastChannel('cms_session_sync');
        channel.onmessage = (msg) => {
            if (msg.data === 'check_session' && sessionStorage.getItem('cms_tab_session') === 'active') {
                channel.postMessage('session_active');
            }
        };
    },

    setViewMode(mode, btnElement) {
        if (mode === 'list') {
            document.body.classList.add('global-list-view');
            localStorage.setItem('cms_view_mode_' + this.currentPage, 'list');
        } else {
            document.body.classList.remove('global-list-view');
            localStorage.setItem('cms_view_mode_' + this.currentPage, 'grid');
        }
        
        // Update button active states in the current container
        if (btnElement) {
            const container = btnElement.closest('.view-toggle');
            if (container) {
                container.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
                btnElement.classList.add('active');
            }
        } else {
            // If initialized without button context, update all toggles on page
            document.querySelectorAll('.view-toggle').forEach(container => {
                container.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
                const targetBtn = container.querySelector(`[onclick*="'${mode}'"]`);
                if (targetBtn) targetBtn.classList.add('active');
            });
        }
    },

    async init() {
        this.cmsStartTime = Date.now(); // Record start for 1s minimum loader
        
        // Step 0: Try to sync session from other open tabs before checking auth
        await this.syncSessionWithOtherTabs();

        this.currentPage = this.getSlug();
        console.log(`[CMS] Initializing on page: ${this.currentPage}`);

        this._injectBrandStyles(); // Global brand font (Acumin-like) + header logo size
        this._injectListViewStyles(); // Inject CSS for Grid/List view toggle
        // NOTE: _injectMobileCreditLink + _injectMobileMenuSearch run AFTER tagElements()
        // so they don't shift the auto-tag index of real content elements (kept stable for DB mapping).

        // Initialize view mode specific to current page
        const defaultMode = this.currentPage === 'resources' ? 'list' : 'grid';
        const savedViewMode = localStorage.getItem('cms_view_mode_' + this.currentPage) || defaultMode;
        if (savedViewMode === 'list') {
            document.body.classList.add('global-list-view');
        }
        
        // Sync toggle button active states on initial load
        document.querySelectorAll('.view-toggle button').forEach(btn => {
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${savedViewMode}'`)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.body.classList.add('cms-content-loading'); // Prevent flicker
        await this.checkAuthStatus(); // Check auth first (with session sync)
        // Removed conditional DOM injection here to prevent index shifting
        this.injectLoginLink();
        this.injectAlertUI(); // Add custom alert system

        // GLOBAL LINK INTERCEPTOR (V3)
        // This ensures that clicking a link with data-cms during edit mode opens the editor instead of navigating.
        document.body.addEventListener('click', (e) => {
            if (!this.isEditing) return;
            
            // If the user clicked directly on an editable text element inside a link,
            // let them edit the text directly rather than opening the link editor.
            const targetCms = e.target.closest('[data-cms]');
            if (targetCms && targetCms.tagName !== 'A') {
                return;
            }

            // Catch clicks on anything inside an <a> with data-cms
            const link = e.target.closest('a[data-cms]');
            
            if (link) {
                e.preventDefault();
                e.stopPropagation();
                
                const cmsId = link.getAttribute('data-cms');
                console.log(`[CMS] Intercepted link click: ${cmsId}`);

                // -- GUARD: Do NOT open link editor on the case-studies listing page --
                // The "CASE STUDY >" links should not trigger the Edit Link modal there.
                if (this.currentPage === 'case-studies') return;
                
                // Home page product "Read More" links open the Link Editor so the URL is editable.

                // -- GUARD: Do NOT open link editor for product cards on the Solutions page --
                if (this.currentPage === 'solutions') {
                    if (link.closest('.product-item')) {
                        console.log(`[CMS] Skipping link editor for solutions page card link: ${cmsId}`);
                        return;
                    }
                }

                this.openLinkEditor(link);
            }
        }, { capture: true }); // USE CAPTURE PHASE!

        // -- FOOTER LOGIN PROTECTION --
        // Intercept clicks on "CMS Login" links across the site if already logged in
        document.body.addEventListener('click', async (e) => {
            const loginLink = e.target.closest('a[href*="login.html"]');
            if (!loginLink) return;

            // Only intercept if we are already logged in
            if (this.isLoggedIn) {
                e.preventDefault();
                e.stopPropagation();

                const shouldLogout = await this._showConfirmAsync(
                    'Already Authenticated', 
                    'You are already logged in to the CMS. Would you like to logout and return to the login screen?',
                    'Logout',
                    'Stay Logged In'
                );

                if (shouldLogout) {
                    await this.logout();
                    window.location.href = 'login.html';
                }
            }
        }, true);

        // Auto-tag elements and fetch content for ALL users (visitors + admins)
        // This ensures CMS edits are actually visible on the live site!
        this._injectSharedTopbar();  // Inject shared header topbar BEFORE tagging
        this._injectCreditLink();    // Inject editable credit download link
        this._injectSharedFooter(); // Inject shared footer/logos BEFORE tagging so data-cms attrs are present
        this._injectBaselokProPromo(); // Inject centralized BaseLok PRO promo section
        this.tagElements();
        // Inject mobile-only header extras AFTER tagging so they never shift real elements' auto-tag index.
        this._injectMobileCreditLink(); // Mobile header "Application for Credit" button
        this._injectMobileMenuSearch(); // Mobile menu top search box
        if (!this.isLoggedIn) this._protectImages(); // Deter image saving for public visitors only
        await this.fetchContent();
        this.initFilters();
        this._renderDynamicLatestArticles();
        console.log(`[CMS] Finalizing init. CurrentPage: ${this.currentPage}`);
        if (this.currentPage === 'resources' || this.currentPage === 'case-studies' || this.currentPage.startsWith('application-') || this.currentPage.startsWith('market-') || this.currentPage.startsWith('solution-') || this.currentPage.startsWith('sub-')) {
            console.log(`[CMS] Rendering Dynamic Project Highlights on ${this.currentPage}...`);
            this._renderDynamicCaseStudies();
        }
        if (this.currentPage === 'support') {
            this._renderDynamicTeamMembers();
        }

        // Instantly sync #mainImage for Solution/Case Study Pages to prevent its inherent 1s polling delay
        const firstThumb = document.querySelector('[data-cms="product-thumb-1"]');
        const mainImg = document.getElementById('mainImage');
        
        let imageWaitPromise = Promise.resolve();

        if (firstThumb && mainImg && firstThumb.src) {
            if (mainImg.src !== firstThumb.src) {
                // Return a promise that resolves when the new image finishes loading
                imageWaitPromise = new Promise(resolve => {
                    mainImg.onload = resolve;
                    mainImg.onerror = resolve; // don't hang if error
                    mainImg.src = firstThumb.src;
                });
            }
        }

        // Wait for the image to load (or resolve instantly if no image to update)
        await imageWaitPromise;

        // Wait for all CMS image preloads to finish (prevents old-image flash on applications page)
        if (this._pendingImageLoads?.length) {
            const _imgTimeout = new Promise(r => setTimeout(r, 3000));
            await Promise.race([Promise.allSettled(this._pendingImageLoads), _imgTimeout]);
            this._pendingImageLoads = [];
        }

        // Setup fade-in once ALL content logic (including images) is complete
        const elapsed = Date.now() - (this.cmsStartTime || Date.now());
        const delay = 0;
        setTimeout(() => {
            document.body.classList.remove('cms-content-loading');
            document.body.classList.add('cms-content-ready'); // Added content-ready for page fade in
            document.body.classList.add('cms-loaded');
            
            // Remove global preloader
            const preloader = document.getElementById('preloader');
            if (preloader) {
                
                preloader.style.opacity = '0';
                if(preloader) preloader.remove();
            }
            if (this.isLoggedIn) {
                this.setupEditControls();
            }
        }, delay);

        if (this.isLoggedIn) {
            this.injectDashboard();
            this.showAdminBar();
            this.enableEditing();
            this.setupAutoLogout();

            // Re-open dashboard if param exists (keeps it "open" across page switches)
            const params = new URLSearchParams(window.location.search);
            if (params.has('cms_dashboard')) {
                this.openDashboard();

                // Auto-select tab if passed in URL, or based on page context
                let targetTab = params.get('cms_tab') || 'overview';

                // Smart tab selection for main pages if no explicit tab in URL
                if (!params.has('cms_tab')) {
                    if (this.currentPage === 'case-studies') targetTab = 'case-studies';
                    else if (this.currentPage === 'resources') targetTab = 'resources-page';
                }

                // Apply the tab selection
                const tabItem = this.dashboardModal?.querySelector(`.cms-menu-item[data-tab="${targetTab}"]`);
                if (tabItem) {
                    this.dashboardModal.querySelectorAll('.cms-menu-item').forEach(i => i.classList.remove('active'));
                    tabItem.classList.add('active');
                    this.renderTab(targetTab);
                } else {
                    this.renderTab('overview');
                }
                // Always reset menu scroll to start (first item) on mobile after render
                setTimeout(() => {
                    const menu = this.dashboardModal?.querySelector('.cms-menu');
                    if (menu) menu.scrollLeft = 0;
                }, 150);

                // Clean up URL without reload
                const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
            }

            // -- GLOBAL PASTE CLEANER & IMAGE UPLOAD --
            // Stripts borders, backgrounds, and fixed formatting from pasted content
            // AND handles direct image pasting for quick updates
            document.addEventListener('paste', async (e) => {
                if (!this.isEditing) return;

                const target = e.target.closest('[data-cms]');
                const items = (e.clipboardData || e.originalEvent.clipboardData).items;

                // 1. Handle Image Paste
                for (const item of items) {
                    if (item.type.indexOf('image') !== -1) {
                        e.preventDefault();
                        const blob = item.getAsFile();
                        const formData = new FormData();
                        formData.append('file', blob);
                        formData.append('folder', 'GALLERY');

                        this.showStatus('Uploading pasted image...', 'info');
                        try {
                            const res = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData,
                                credentials: 'include'
                            });
                            if (!res.ok) throw new Error('Upload failed');
                            const data = await res.json();
                            
                            // If we have a hover target (image), update it. 
                            // Otherwise, if the target of the paste was an image, update that.
                            // -- SMART IMAGE DETECTION --
                            // 1. Try currently hovered target (tracked globally)
                            // 2. Try the element that was clicked/focused when pasting
                            // 3. If target is a wrapper, find the first image inside it
                            let imgToUpdate = null;
                            const isImage = (el) => el && (el.tagName === 'IMG' || window.getComputedStyle(el).backgroundImage !== 'none');

                            if (isImage(this.hoverTarget)) {
                                imgToUpdate = this.hoverTarget;
                            } else if (isImage(target)) {
                                imgToUpdate = target;
                            } else if (target) {
                                // If we're inside a gallery item, find the image in that item
                                const gallItem = target.closest('.app-gallery-item');
                                if (gallItem) {
                                    imgToUpdate = gallItem.querySelector('img');
                                } else {
                                    // Otherwise find any child image
                                    imgToUpdate = target.querySelector('img') || target;
                                }
                                if (!isImage(imgToUpdate)) imgToUpdate = null;
                            }

                            if (imgToUpdate) {
                                this.activeImageElement = imgToUpdate;
                                this.updateActiveImage(data.url);
                                this.showStatus('Image pasted successfully!', 'success');
                            } else {
                                this.showStatus('Please hover over an image or its container to paste.', 'warning');
                            }
                        } catch (err) {
                            this.showStatus('Failed to upload pasted image.', 'error');
                        }
                        return;
                    }
                }

                // 2. Handle Text Paste Sanitization (Improved)
                // User Request: Fix "automatic replace" bug in lists
                if (target && !e.clipboardData.types.includes('Files')) {
                    e.preventDefault();
                    const text = e.clipboardData.getData('text/plain');
                    
                    // Use insertText which natively respects contenteditable structures (like lists)
                    document.execCommand('insertText', false, text);
                    
                    const elId = target.getAttribute('data-cms');
                    // Small delay to ensure the DOM has updated before we sync to state
                    setTimeout(() => {
                        this.updateElement(elId, 'text', target.innerHTML);
                    }, 50);
                }
            });


            // Warn if user tries to leave with unsaved changes
            window.addEventListener('beforeunload', (e) => {
                const hasChanges = Object.keys(this.pendingChanges).length > 0;
                if (hasChanges && !this.isSaving && !this.navigatingInternally) {
                    e.preventDefault();
                    e.returnValue = ''; // Standard way to show "Unsaved Changes" dialog
                }
            });
        }
    },

    injectAlertUI() {
        if (document.getElementById('cms-alert-overlay')) return;
        const style = document.createElement('style');
        style.innerHTML = `
            .cms-alert-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.4); backdrop-filter: blur(8px);
                z-index: 3000000; display: none; justify-content: center; align-items: center;
                font-family: 'Rubik', sans-serif; animation: cmsFadeIn 0.3s ease;
            }
            .cms-alert-dialog {
                background: white; padding: 35px; border-radius: 16px; width: 420px; max-width: 90%;
                box-shadow: 0 20px 50px rgba(0,0,0,0.3); transform: translateY(20px);
                animation: cmsSlideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            .cms-alert-title { color: #d11f26; font-weight: 800; font-size: 1.2rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .cms-alert-msg { color: #444; font-size: 0.95rem; margin-bottom: 25px; line-height: 1.6; }
            .cms-alert-actions { display: flex; justify-content: flex-end; gap: 12px; }
            .cms-alert-btn { 
                padding: 10px 22px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; 
                cursor: pointer; text-transform: uppercase; transition: all 0.2s; border: none;
            }
            .cms-alert-btn-ok { background: #d11f26; color: white; }
            .cms-alert-btn-ok:hover { background: #a5181e; transform: translateY(-2px); }
            .cms-alert-btn-cancel { background: #f0f0f0; color: #666; }
            .cms-alert-btn-cancel:hover { background: #e0e0e0; color: #333; }
            @keyframes cmsFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes cmsSlideUp { to { transform: translateY(0); } }
            
            /* CMS Edit Mode Styles */
            [data-cms][contenteditable="true"]:focus {
                outline: none !important;
                background: rgba(0, 176, 91, 0.05);
            }
            .cms-edit-active {
                outline: 2px dashed #d11f26 !important;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.id = 'cms-alert-overlay';
        overlay.className = 'cms-alert-overlay';
        overlay.innerHTML = `
            <div class="cms-alert-dialog">
                <div class="cms-alert-title" id="cms-alert-title">Notification</div>
                <div class="cms-alert-msg" id="cms-alert-msg">Message goes here...</div>
                <div class="cms-alert-actions">
                    <button class="cms-alert-btn cms-alert-btn-cancel" id="cms-alert-cancel" style="display:none">Cancel</button>
                    <button class="cms-alert-btn cms-alert-btn-ok" id="cms-alert-ok">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    _showAlertAsync(title, message, okText = 'OK') {
        return new Promise((resolve) => {
            const overlay = document.getElementById('cms-alert-overlay');
            if (!overlay) { console.warn('Alert UI not injected'); resolve(true); return; }
            document.getElementById('cms-alert-title').innerText = title || 'Notification';
            document.getElementById('cms-alert-msg').innerText = message;
            document.getElementById('cms-alert-cancel').style.display = 'none';
            const okBtn = document.getElementById('cms-alert-ok');
            okBtn.innerText = okText;
            okBtn.onclick = () => {
                overlay.style.display = 'none';
                resolve(true);
            };
            overlay.style.display = 'flex';
        });
    },

    _showConfirmAsync(title, message, okText = 'OK', cancelText = 'Cancel') {
        return new Promise((resolve) => {
            const overlay = document.getElementById('cms-alert-overlay');
            if (!overlay) { console.warn('Alert UI not injected'); resolve(false); return; }
            document.getElementById('cms-alert-title').innerText = title || 'Confirmation Required';
            document.getElementById('cms-alert-msg').innerText = message;
            
            const cancelBtn = document.getElementById('cms-alert-cancel');
            cancelBtn.innerText = cancelText;
            cancelBtn.style.display = 'block';

            const okBtn = document.getElementById('cms-alert-ok');
            okBtn.innerText = okText;
            
            okBtn.onclick = () => {
                overlay.style.display = 'none';
                resolve(true);
            };
            cancelBtn.onclick = () => {
                overlay.style.display = 'none';
                resolve(false);
            };
            overlay.style.display = 'flex';
        });
    },

    confirmAction(msg, callback) {
        this._showConfirmAsync('Are you sure?', msg).then(confirmed => {
            if (confirmed) callback();
        });
    },

    showAlert(title, msg, okText) {
        return this._showAlertAsync(title, msg, okText);
    },

    showConfirm(title, msg, okText, cancelText) {
        return this._showConfirmAsync(title, msg, okText, cancelText);
    },


    tagElements() {
        // Prevent mainImage from being auto-tagged or edited directly.
        // EXCEPTION: on case-study detail pages the hero IS the editable image (keep its data-cms).
        const mainImg = document.getElementById('mainImage');
        if (mainImg && !this.currentPage.startsWith('case-study-')) mainImg.setAttribute('data-cms', 'no-edit');

        const path = this.getSlug();

        // Application intro sub-navigation lists are structural nav (links to sub-pages), NOT editable content.
        // Keeping them static prevents their fragile positional auto-IDs from picking up stale/wrong DB content
        // (e.g. breadcrumb "Home"/"Applications" leaking into these links). cms-no-tag on the <ul> covers all children.
        document.querySelectorAll('.application-inner .title-desc ul').forEach(ul => ul.setAttribute('cms-no-tag', ''));

        document.querySelectorAll('*').forEach((el, index) => {
            if (['HTML', 'BODY', 'SCRIPT', 'STYLE', 'LINK', 'META', 'HEAD'].includes(el.tagName)) return;
            if (el.closest('.cms-modal') || el.closest('#cms-admin-bar') || el.closest('#cms-dashboard-modal')) return;
            if (el.closest('.resource-tabs')) return;
            if (el.closest('nav.main-menu')) return; // Never auto-tag nav items - stale DB values corrupt the nav
            if (el.closest('.breadcrumb-wrapper')) return; // Never auto-tag breadcrumb links - structural nav, positional IDs collide with content links
            if (el.closest('.footer') && el.classList.contains('widget-title')) return; // Never auto-tag footer headings
            if (el.hasAttribute('cms-no-tag') || el.closest('[cms-no-tag]') || el.getAttribute('data-cms') === 'no-edit') return;
            if (el.id && el.id.startsWith('cms-')) return;
            
            // Prevent auto-tagging elements inside an explicitly tagged parent block (like a UL)
            if (el.parentElement && el.parentElement.closest('[data-cms]')) return;

            const isTextTag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'A', 'SPAN', 'UL', 'OL', 'B', 'STRONG'].includes(el.tagName);
            const isImg = el.tagName === 'IMG';
            const bg = window.getComputedStyle(el).backgroundImage;
            const isBg = (bg !== 'none' && bg !== '' && bg.includes('url'));

            if ((isTextTag || isImg || isBg) && !el.hasAttribute('data-cms')) {
                const typeName = isBg ? 'bg' : el.tagName.toLowerCase();
                el.setAttribute('data-cms', `auto-${path}-${typeName}-${index}`);
            }
        });

        // NEW: Dedicated pass for Image Parent Links (both Auto and Static)
        // This ensures client-logo-3 gets client-logo-3-link tagged on its parent <a>
        // NOTE: We also override auto-generated IDs (e.g. auto-index-a-NNN) so that
        // fetchContent() can find saved link values by the proper -link key.
        document.querySelectorAll('img[data-cms]').forEach(img => {
            const id = img.getAttribute('data-cms');
            const parentLink = img.closest('a');
            if (parentLink) {
                const existingId = parentLink.getAttribute('data-cms');
                if (!existingId || existingId.startsWith('auto-')) {
                    parentLink.setAttribute('data-cms', `${id}-link`);
                }
            }
        });

        // Special: Ensure ALL download links and buttons are tagged
        // We use a very broad selector to catch all potential links
        document.querySelectorAll('a, .download-text-link, .ttm-btn, .btn').forEach((el, index) => {
            if (!el.hasAttribute('data-cms')) {
                // Ignore menu links, social links, breadcrumb nav, and the CMS dashboard entirely
                if (el.closest('.main-menu') || el.closest('.social-icons') || el.closest('.cms-modal') || el.closest('#cms-dashboard-modal') || el.closest('#cms-admin-bar')) return;
                if (el.closest('.breadcrumb-wrapper')) return; // breadcrumb links are structural nav, not editable content
                if (el.hasAttribute('cms-no-tag') || el.closest('[cms-no-tag]') || el.getAttribute('data-cms') === 'no-edit' || el.closest('.resource-tabs')) return;

                const txt = el.innerText.trim();
                if (txt.length > 0 || el.querySelector('img, i')) {
                    el.setAttribute('data-cms', `auto-${path}-a-link-${index}`);
                }
            }
        });


        // -- HOMEPAGE: Force Fix 404 Links Aggressively (No longer needed, HTML is stable) --
    },

    slugify(text) {
        if (!text) return "";
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    },

    _extractSlugFromUrl() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        // Default extraction
        let slug = filename.replace('product-detail-', '').replace('solution-', '');
        
        // Manual fallback mapping for database mismatches (Found via CMS-DEBUG)
        const fallbacks = {
            'marine': 'marine-mattresses',
            'siltguard': 'filter-mattresses',
            'ballastguard': 'ballastguard',
            'geocell': 'geocell',
            'geogrids': 'geogrid'
        };

        if (fallbacks[slug]) {
            slug = fallbacks[slug];
        }

        return slug;
    },

    getSlug() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    },

    // -------------------------------------------------------------------------
    // SHARED HEADER TOPBAR INJECTION
    // Replaces each page's hard-coded topbar with one shared editable template.
    // Keys map to GLOBAL_KEYS ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â  editable only on index, displayed on all pages.
    // -------------------------------------------------------------------------
    _injectSharedTopbar() {
        const topbar = document.querySelector('.top_bar .container, .top_bar .container-fluid');
        if (!topbar) return;

        topbar.innerHTML = `
          <div class="row no-gutters">
            <div class="col-xl-12 d-flex flex-row align-items-center">
              <div class="top_bar_contact_item">
                <div class="top_bar_icon"><i class="ti ti-email"></i></div>
                <a href="mailto:info@baselok.com" data-cms="header-email-link" data-link-only="true"><span data-cms="header-email">info@baselok.com</span></a>
              </div>
              <div class="top_bar_contact_item">
                <div class="top_bar_icon"><i class="fa fa-phone"></i></div>
                <span data-cms="header-address">510 O'Neal Lane Ext. Baton Rouge, LA 70819</span>
              </div>
              <div class="top_bar_contact_item ms-auto d-none d-lg-flex" style="align-items:center;padding:0 18px;">
                <a href="credit-application.html" data-cms="header-credit-link" style="color:#fff;font-size:13px;font-weight:500;text-decoration:none;white-space:nowrap;">
                  <span data-cms="header-credit-text">Application for Credit</span>
                </a>
              </div>
              <div class="top_bar_contact_item top_bar_social p-0">
                <ul class="social-icons list-inline">
                  <li>
                    <a class="tooltip-top" href="https://www.facebook.com/BaseLok-by-Industrial-Fabrics-Inc-114493230378198"
                       rel="noopener" aria-label="facebook" data-tooltip="Facebook" target="_blank"
                       data-cms="header-facebook-link" data-link-only="true">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a class="tooltip-top" href="https://www.linkedin.com/company/baselok"
                       rel="noopener" aria-label="linkedin" data-tooltip="Linkedin" target="_blank"
                       data-cms="header-linkedin-link" data-link-only="true">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
    },

    // -------------------------------------------------------------------------
    // CREDIT DOWNLOAD LINK INJECTION
    // Makes the "Download our Credit Application" link globally editable.
    // data-cms keys are GLOBAL ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â edit on any page, reflects everywhere.
    // -------------------------------------------------------------------------
    _injectCreditLink() {
        const siteDesc = document.querySelector('.site-description');
        if (!siteDesc) return;
        // Use hardcoded defaults ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â fetchContent will overwrite with saved values
        siteDesc.innerHTML = `
            <a href="credit-application.html" class="credit-download"
               data-cms="header-credit-link">
                <h2 data-cms="header-credit-text">APPLICATION FOR CREDIT</h2>
            </a>`;
    },

    // -------------------------------------------------------------------------
    // SHARED FOOTER & CLIENT LOGOS INJECTION
    // Replaces each page's hard-coded footer/logos with one shared template.
    // data-cms keys here map to GLOBAL_KEYS on the backend ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â editable ONLY on
    // the index page, but loaded and displayed on every page.
    // -------------------------------------------------------------------------
    _injectBaselokProPromo() {
        const placeholder = document.querySelector('.bpro-promo-inject');
        if (!placeholder) return;
        placeholder.outerHTML = `
      <section class="ttm-bgcolor-darkgrey ttm-textcolor-white" style="padding:35px 0;overflow:hidden;position:relative;">
        <div class="container" style="position:relative;z-index:1;">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12" style="margin-bottom:20px;">
              <img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='65'%3E%3Crect%20width='200'%20height='65'%20fill='%23f0f0f0'/%3E%3Ctext%20x='100'%20y='39'%20font-family='Arial'%20font-size='15'%20font-weight='bold'%20fill='%23bbb'%20text-anchor='middle'%3EBaseLok%20PRO%3C/text%3E%3C/svg%3E" data-cms="bpro-global-logo" alt="BaseLok PRO" style="max-height:65px;width:auto;display:block;margin-bottom:22px;">
              <h2 style="color:#ffffff;font-size:30px;font-weight:700;line-height:1.35;margin-bottom:18px;" data-cms="bpro-global-heading">Design with confidence,<br>from anywhere.</h2>
              <ul style="list-style:none;padding:0;margin:0 0 28px 0;">
                <li style="color:rgba(255,255,255,0.75);padding:5px 0;font-size:14px;display:flex;align-items:flex-start;gap:10px;"><span style="color:#c8102e;flex-shrink:0;margin-top:2px;">&#9679;</span>Design &amp; evaluate pavement, rail, and foundation sections</li>
                <li style="color:rgba(255,255,255,0.75);padding:5px 0;font-size:14px;display:flex;align-items:flex-start;gap:10px;"><span style="color:#c8102e;flex-shrink:0;margin-top:2px;">&#9679;</span>Instantly compare reinforced vs. unreinforced costs</li>
                <li style="color:rgba(255,255,255,0.75);padding:5px 0;font-size:14px;display:flex;align-items:flex-start;gap:10px;"><span style="color:#c8102e;flex-shrink:0;margin-top:2px;">&#9679;</span>Generate exportable reports for project stakeholders</li>
                <li style="color:rgba(255,255,255,0.75);padding:5px 0;font-size:14px;display:flex;align-items:flex-start;gap:10px;"><span style="color:#c8102e;flex-shrink:0;margin-top:2px;">&#9679;</span>AREMA, AASHTO &amp; industry-standard calculations</li>
                <li style="color:rgba(255,255,255,0.75);padding:5px 0;font-size:14px;display:flex;align-items:flex-start;gap:10px;"><span style="color:#c8102e;flex-shrink:0;margin-top:2px;">&#9679;</span>US &amp; metric units &#8212; cloud-based &amp; collaborative</li>
              </ul>
              <a href="baselok-pro.html" class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-white" style="margin-right:12px;margin-bottom:10px;">Learn More &#8594;</a>
              <a href="contact-us.html" class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor" style="margin-bottom:10px;">Start Designing Now &#8594;</a>
            </div>
            <div class="col-lg-6 col-md-12 text-center">
              <img data-cms="bpro-global-device" src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='400'%3E%3Crect%20width='600'%20height='400'%20fill='%23eaeaea'/%3E%3Ctext%20x='300'%20y='205'%20font-family='Arial'%20font-size='22'%20fill='%23aaa'%20text-anchor='middle'%3EBaseLok%20PRO%3C/text%3E%3C/svg%3E" class="img-fluid" alt="BaseLok PRO Design Software" style="width:100%;height:auto;filter:drop-shadow(0 8px 20px rgba(0,0,0,0.4));">
            </div>
          </div>
        </div>
      </section>`;
    },

    _injectSharedFooter() {
        // -- 1. CLIENT LOGOS BAR ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â removed, hide sections --------------------
        document.querySelectorAll('section.client-section').forEach(section => {
            section.style.display = 'none';
        });

        // -- 2. FOOTER -------------------------------------------------------
        const footer = document.querySelector('footer.footer.widget-footer');
        if (!footer) return;

        footer.outerHTML = `
      <footer class="footer widget-footer ttm-bgcolor-darkgrey ttm-textcolor-white clearfix">
        <div class="second-footer">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 widget-area">
                <div class="widget widget_text margin_right10 clearfix">
                  <div class="footer-logo mb-3">
                    <img id="footer-logo-img" class="img-fluid auto_size" height="46" width="170" src="/images/Artboard-white.png" alt="Baselok" data-cms="footer-logo">
                  </div>
                  <div class="textwidget widget-text">
                    <p data-cms="footer-tagline">Between Biaxial and Uniaxial Geogrid and Cellular Confinement Technologies, Geosynthetics Have Been at the Forefront of Soil Stabilization Applications Since 1959.</p>
                  </div>
                  <div class="social-icons text-lg-right">
                    <ul class="social-icons list-inline">
                      <li><a class="tooltip-top" href="https://www.facebook.com/BaseLok-by-Industrial-Fabrics-Inc-114493230378198" rel="noopener" aria-label="facebook" data-tooltip="Facebook" target="_blank" data-cms="footer-facebook-link" data-link-only="true"><i class="fa fa-facebook"></i></a></li>
                      <li><a class="tooltip-top" href="https://www.linkedin.com/company/baselok" rel="noopener" aria-label="linkedin" data-tooltip="Linkedin" target="_blank" data-cms="footer-linkedin-link" data-link-only="true"><i class="fa fa-linkedin"></i></a></li>
                    </ul>
                  </div>
                  <div class="footer-cert-logos mt-2 d-flex align-items-center" style="gap: 20px;">
                    <img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100'%20height='50'%3E%3Crect%20width='100'%20height='50'%20fill='%23eeeeee'/%3E%3Ctext%20x='50'%20y='29'%20font-family='Arial'%20font-size='12'%20fill='%23999'%20text-anchor='middle'%3EBABA%3C/text%3E%3C/svg%3E" alt="BABA Logo" data-cms="footer-baba-logo" class="img-fluid" style="width: 95px; height: 95px; object-fit: contain; cursor: pointer;">
                    <img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100'%20height='50'%3E%3Crect%20width='100'%20height='50'%20fill='%23eeeeee'/%3E%3Ctext%20x='50'%20y='29'%20font-family='Arial'%20font-size='12'%20fill='%23999'%20text-anchor='middle'%3EISO%3C/text%3E%3C/svg%3E" alt="ISO Logo" data-cms="footer-iso-logo" class="img-fluid" style="width: 95px; height: 95px; object-fit: contain; cursor: pointer;">
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 widget-area">
                <div class="widget widget_nav_menu clearfix">
                  <h3 class="widget-title">Solutions</h3>
                  <ul class="menu" cms-no-tag>
                    <li><a href="solution-geogrid.html">GeoGrid</a></li>
                    <li><a href="solution-fabgrid.html">FabGrid<sup>&reg;</sup></a></li>
                    <li><a href="solution-geocell.html">GeoCell</a></li>
                    <li><a href="solution-fps.html">Baselok<sup>&reg;</sup> FPS</a></li>
                    <li><a href="solution-ballastguard.html">BallastGuard<sup>&trade;</sup></a></li>
                    <li><a href="solution-marine.html">Marine</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 widget-area">
                <div class="widget widget-recent-post clearfix">
                  <h3 class="widget-title">Resources</h3>
                  <ul class="menu" cms-no-tag>
                    <li><a href="resources.html#pane-downloads">Downloads</a></li>
                    <li><a href="resources.html#pane-videos">Videos</a></li>
                    <li><a href="resources.html">All Resources</a></li>
                    <li><a href="credit-application.html">Apply for Credit</a></li>
                    <li><a href="baselok-pro.html">BaseLok Pro</a></li>
                    <li><a href="login.html">CMS Login</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3 widget-area">
                <div class="widget widget-latest-tweets clearfix">
                  <h3 class="widget-title">Contact Us</h3>
                  <ul class="widget_contact_wrapper">
                    <li data-cms="footer-address">
                      <i class="ttm-textcolor-skincolor fa fa-map-marker"></i>510 O'Neal Lane Ext. Baton Rouge, LA 70819
                    </li>
                    <li>
                      <a href="tel:+17136412727" class="d-block" data-cms="footer-phone-1">
                        <i class="ttm-textcolor-skincolor fa fa-phone"></i>+1.713.641.2727</a>
                      <a href="tel:+18008484500" class="d-block" data-cms="footer-phone-2">
                        <i class="ttm-textcolor-skincolor fa fa-phone"></i>+1.800.848.4500</a>
                    </li>
                    <li data-cms="footer-email">
                      <i class="ttm-textcolor-skincolor fa fa-envelope-o"></i><a href="mailto:info@baselok.com">info@baselok.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-footer-text copyright">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="text-center">
                  <span class="cpy-text">Copyright &copy; <span id="year">${new Date().getFullYear()}</span> Baselok<sup>&reg;</sup>, Inc. All Rights Reserved.</span>
                  <ul class="footer-nav-menu">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>
          .copyright { padding-top: 15px !important; padding-bottom: 15px !important; margin-top: 0 !important; }
          .second-footer .widget-area .widget { padding-bottom: 20px !important; padding-top: 40px !important; }
        </style>
      </footer>`;
    },


    _injectListViewStyles() {
        if (document.getElementById('cms-list-view-styles')) return;
        const style = document.createElement('style');
        style.id = 'cms-list-view-styles';
        style.textContent = `
            body.global-list-view .scrollable-content .product-item,
            body.global-list-view #grid-stories .product-item {
                width: 100% !important;
                max-width: 100% !important;
                flex: 0 0 100% !important;
                margin-top: 0px !important;
                padding-top: 8px !important;
                padding-bottom: 8px !important;
            }
            body.global-list-view .scrollable-content .row.g-4,
            body.global-list-view #grid-stories {
                margin-top: -8px !important;
                row-gap: 0 !important;
            }
            body.global-list-view .scrollable-content .featured-imagebox,
            body.global-list-view .scrollable-content .product-card,
            body.global-list-view #grid-stories .featured-imagebox,
            body.global-list-view #grid-stories .product-card {
                flex-direction: row !important;
                height: auto !important;
                align-items: stretch;
                display: flex;
                margin-bottom: 0 !important;
            }
            body.global-list-view .scrollable-content .featured-thumbnail,
            body.global-list-view .scrollable-content .product-img,
            body.global-list-view #grid-stories .featured-thumbnail,
            body.global-list-view #grid-stories .product-img {
                width: 240px !important;
                min-width: 240px !important;
                max-width: 240px !important;
                flex-shrink: 0;
            }
            body.global-list-view .scrollable-content .featured-content,
            body.global-list-view #grid-stories .featured-content {
                justify-content: center;
                text-align: left;
                flex: 1;
            }
            body.global-list-view .scrollable-content .product-card > .pt-3,
            body.global-list-view #grid-stories .product-card > .pt-3 {
                flex: 1;
                padding: 15px 25px !important;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            body.global-list-view .scrollable-content .product-card > .pt-3 p,
            body.global-list-view #grid-stories .product-card > .pt-3 p {
                max-width: 800px;
                margin-bottom: 5px !important;
            }
            body.global-list-view .scrollable-content .product-card h4,
            body.global-list-view .scrollable-content .product-card > .pt-3 h4,
            body.global-list-view #grid-stories .product-card h4,
            body.global-list-view #grid-stories .product-card > .pt-3 h4 {
                margin-bottom: 8px !important;
                font-size: 1.25rem !important;
            }
            @media (max-width: 767px) {
                body.global-list-view .scrollable-content .featured-imagebox,
                body.global-list-view .scrollable-content .product-card,
                body.global-list-view #grid-stories .featured-imagebox,
                body.global-list-view #grid-stories .product-card {
                    flex-direction: column !important;
                }
                body.global-list-view .scrollable-content .featured-thumbnail,
                body.global-list-view .scrollable-content .product-img,
                body.global-list-view #grid-stories .featured-thumbnail,
                body.global-list-view #grid-stories .product-img {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                body.global-list-view .scrollable-content .product-card > .pt-3,
                body.global-list-view #grid-stories .product-card > .pt-3 {
                    padding: 15px !important;
                }
            }
        `;
        document.head.appendChild(style);
    },



    // Inject header logo sizing (font is left untouched Ã¢â‚¬&rdquo; uses the site's original font).
    _injectMobileCreditLink() {
        if (document.querySelector('.mobile-credit-btn')) return;
        const siteNav = document.querySelector('.site-navigation');
        if (!siteNav) return;
        const link = document.createElement('a');
        link.href = 'credit-application.html';
        link.className = 'mobile-credit-btn';
        link.setAttribute('cms-no-tag', ''); // Exclude from CMS auto-tagging (prevents 403 save errors)
        link.innerHTML = 'Application<br>for Credit';
        siteNav.appendChild(link);
    },

    // Inject a search box at the top of the mobile slide-out menu (triggers the existing search overlay)
    _injectMobileMenuSearch() {
        const menu = document.querySelector('.main-menu.menu-mobile ul.menu') || document.querySelector('nav#menu ul.menu');
        if (!menu || menu.querySelector('.mobile-menu-search')) return;
        const li = document.createElement('li');
        li.className = 'mega-menu-item mobile-menu-search';
        li.setAttribute('cms-no-tag', ''); // Exclude from CMS auto-tagging (prevents 403 save errors)
        li.innerHTML = '<a href="#" class="mobile-menu-search-link" cms-no-tag><i class="fa fa-search"></i><span>Search...</span></a>';
        li.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const btn = document.querySelector('.header_search .search_btn');
            if (btn) btn.click();
        });
        menu.insertBefore(li, menu.firstChild);
    },

    _injectBrandStyles() {
        if (document.getElementById('cms-brand-styles')) return;
        const style = document.createElement('style');
        style.id = 'cms-brand-styles';
        style.textContent = `
            #logo-img{height:40px !important;width:auto !important;object-fit:contain}
            /* INDEX HEADER (style-01): make the sticky (fixed) state stick FLUSH to the top.
               The theme breaks it on scroll with position:unset + padding:0, which reflows the nav
               and hides menu items. We restore the layout but pin it to top:0 Ã¢â‚¬&rdquo; the previous top:40px
               left an empty gap above the sticky menu bar on scroll. */
            header.ttm-header-style-01 .site-header-menu .ttm-stickable-header.fixed-header .site-navigation{
                position:absolute !important; left:15px !important; right:15px !important; top:0 !important;
                z-index:2 !important; padding:0 30px !important; background-color:#fff !important;
                box-shadow:0 0 9px rgba(0,0,0,.11) !important;
            }
            header.ttm-header-style-01 #site-header-menu .ttm-stickable-header.fixed-header .site-navigation ul.menu>li>a{padding:43px 15px !important}

            /* ALL OTHER PAGES (style-03 etc.): make the header bar stick on scroll via CSS,
               and neutralize the theme's position:fixed transform so it sticks cleanly as-is. */
            header.ttm-header-style-03{position:-webkit-sticky !important;position:sticky !important;top:0 !important;z-index:1000 !important;background:#fff !important}
            body.cms-edit-mode header.ttm-header-style-03,body.cms-preview-mode header.ttm-header-style-03{top:46px !important}
            header.ttm-header-style-03 .ttm-stickable-header.fixed-header{position:static !important;width:auto !important;box-shadow:none !important}

            /* SLICK DOTS Ã¢â‚¬&rdquo; the base slick.css has no dot theme, so dots were rendering as raw
               numbers (1 2 3 4 5) in empty space, especially on mobile. Style them as neat bullets. */
            .slick-dots{display:flex !important;justify-content:center;align-items:center;list-style:none !important;padding:0 !important;margin:18px 0 0 !important;gap:9px;width:100%}
            .slick-dots li{position:relative;width:auto !important;height:auto !important;margin:0 !important;padding:0 !important}
            .slick-dots li button{font-size:0 !important;line-height:0 !important;width:11px !important;height:11px !important;padding:0 !important;margin:0 !important;border:none !important;border-radius:50% !important;background:#ccc !important;cursor:pointer;text-indent:-9999px;overflow:hidden;transition:background .2s,transform .2s}
            .slick-dots li button:before{display:none !important;content:'' !important}
            .slick-dots li.slick-active button{background:#d11f26 !important;transform:scale(1.25)}
            .slick-dots li:not(.slick-active) button:hover{background:#999 !important}

            /* SLICK ARROWS Ã¢â‚¬&rdquo; the .cms-slick-arrow theme lives in the cms CSS file which keeps getting
               reverted (OneDrive), leaving plain faint chevrons. Re-inject the red circular buttons here. */
            .cms-slick-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:20;width:48px;height:48px;
                border-radius:50%;background:#d11f26;color:#fff;border:none;display:flex;align-items:center;
                justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:background .2s,transform .2s;padding:0}
            .cms-slick-arrow:hover{background:#a01820;transform:translateY(-50%) scale(1.08)}
            .cms-slick-arrow:before{content:none !important}
            .cms-slick-arrow i{font-size:1.2rem;line-height:1;color:#fff}
            .cms-slick-prev{left:-22px}
            .cms-slick-next{right:-22px}
            @media (max-width:767px){.cms-slick-prev{left:25px !important}.cms-slick-next{right:25px !important}}
            /* Topbar "Application for Credit" link (shown on all style-03 pages via _injectSharedTopbar) */
            .top_bar .credit-topbar-link{color:#fff;font-weight:700;font-size:.8rem;text-decoration:none;display:inline-flex;align-items:center;gap:6px;letter-spacing:.3px;transition:color .2s}
            .top_bar .credit-topbar-link i{color:#d11f26}
            .top_bar .credit-topbar-link:hover{color:#d11f26}
            @media (max-width:767px){.top_bar .top_bar_contact_item:nth-child(2){display:none}}
            /* Application detail/sub pages: shrink the large empty gap before "Related Products".
               Scoped via .application-inner (present only on application detail/sub pages, not the main applications.html). */
            .application-inner{padding-bottom:40px !important}
            .application-inner ~ .ttm-bgcolor-grey{padding-top:40px !important;padding-bottom:35px !important}
            .application-inner ~ .product-list{padding-top:35px !important}
            /* Constrain intro image to match the text column height (re-stated here so it applies even if main CSS is cached) */
            @media (min-width:992px){
                .application-inner .row{align-items:stretch !important}
                .application-inner .col-lg-5{position:relative !important}
                .application-inner .col-lg-5 .ttm_single_image-wrapper{position:absolute !important;top:0;bottom:0;left:15px;right:15px;height:100% !important}
                .application-inner .col-lg-5 .ttm_single_image-wrapper img{height:100% !important;width:100% !important;object-fit:cover !important;object-position:center;max-height:none !important}
                .banner_slider .slide { min-height: 520px !important; }
            }
            @media (max-width:767px){
                header.ttm-header-style-01, header.ttm-header-style-01 .site-header-menu-inner, header.ttm-header-style-01 .site-navigation { padding-top: 0px !important; padding-bottom: 0px !important; min-height: auto !important; }
                header.ttm-header-style-01 .site-header-menu { padding-top: 15px !important; padding-bottom: 15px !important; }
                header.ttm-header-style-01 .site-header-menu .ttm-stickable-header.fixed-header .site-navigation { padding: 0 15px !important; left: 0 !important; right: 0 !important; }
                header.ttm-header-style-01 .site-branding { margin-left: -15px !important; padding-top: 0px !important; padding-bottom: 0px !important; }
                .site-branding{flex-shrink:0 !important;margin-left:0px !important}
                #logo-img{width:145px !important;max-height:42px !important;height:auto !important;object-fit:contain !important}
                .site-description{display:none !important}
                .site-navigation{position:relative !important}
                .mobile-credit-btn{position:absolute !important;right:75px !important;top:53% !important;
                    transform:translateY(-50%) !important;display:block !important;
                    font-size:9px !important;font-weight:700 !important;
                    color:#444 !important;text-transform:uppercase !important;letter-spacing:.4px !important;
                    text-align:center !important;text-decoration:none !important;line-height:1.1 !important;
                    padding:3px 6px !important;border:1px solid #aaa !important;border-radius:3px !important;
                    z-index:10 !important;max-width:130px !important;margin-top:2px !important}
                header.ttm-header-style-01 .mobile-credit-btn { right:60px !important; top:51% !important; margin-top:0px !important; }
                .mobile-credit-btn:hover{color:#d11f26 !important;border-color:#d11f26 !important}
            }
            @media (min-width:768px){.mobile-credit-btn{display:none !important}}
            /* Mobile menu top search box — hidden on desktop, shown only when hamburger menu is active */
            .mobile-menu-search{display:none}
            @media (min-width:992px){.mobile-menu-search{display:none !important}}
            @media (max-width:991px){
                .mobile-menu-search{display:block !important;padding:12px 15px !important;border-bottom:1px solid #eee !important}
                .mobile-menu-search .mobile-menu-search-link{display:flex !important;align-items:center !important;gap:10px !important;
                    background:#f4f4f4 !important;border:1px solid #ddd !important;border-radius:6px !important;
                    padding:10px 14px !important;color:#888 !important;font-size:14px !important;font-weight:500 !important;
                    text-decoration:none !important;width:100% !important}
                .mobile-menu-search .mobile-menu-search-link i{color:#d11f26 !important;font-size:15px !important}
                .mobile-menu-search .mobile-menu-search-link:hover{border-color:#d11f26 !important;color:#444 !important}
            }

            /* Keep dynamic slider rows from overflowing / showing partial empty slides on mobile */
            .slick_slider_dynamic{margin-left:0;margin-right:0}
            @media (max-width:575px){
                .slick_slider_dynamic .slick-slide{padding:0 6px}
                .slick_slider_dynamic .featured-imagebox{margin-left:0 !important;margin-right:0 !important}
            }

            /* ===================================================================
               MOBILE CMS UI FIX Ã¢â‚¬&rdquo; only affects phones/tablets (<=768px).
               Desktop/laptop (>=769px) is completely untouched.
               The admin bar had no mobile rules: 4 text buttons + an absolutely
               centered mode pill overflowed and looked distorted. Here we compact
               the bar (icon-only buttons) and make the dashboard usable on phones.
               Injected from cms.js so it survives cms CSS file reverts.
               =================================================================== */
            @media (max-width:768px){
                /* --- Top admin bar --- */
                #cms-admin-bar{padding:0 10px !important;gap:8px}
                .cms-brand-text{font-size:.62rem !important;max-width:32% !important;line-height:1.1}
                /* mode pill was position:absolute;left:50% (overlapped everything) Ã¢â‚¬&rdquo; make it inline & small */
                #cms-admin-bar .cms-mode-indicator{position:static !important;left:auto !important;transform:none !important;
                    font-size:.55rem !important;padding:4px 8px !important;white-space:nowrap;flex-shrink:0}
                .cms-admin-actions{gap:6px !important;flex-shrink:0}
                /* icon-only buttons to fit small screens (text hidden, icon kept) */
                .cms-admin-actions .cms-btn{font-size:0 !important;padding:9px 11px !important;gap:0 !important}
                .cms-admin-actions .cms-btn i{font-size:1.05rem !important;margin:0 !important}

                /* --- Dashboard modal (re-stated here so it works even if the CSS file reverts) --- */
                /* full-screen, pinned to top-left (the base modal centers it, which clipped a 100vh child) */
                #cms-dashboard-modal{align-items:stretch !important;justify-content:flex-start !important}
                #cms-dashboard-modal .cms-dashboard-container{width:100% !important;max-width:100% !important;
                    height:100vh !important;height:100dvh !important;border-radius:0 !important;flex-direction:column !important}
                /* sidebar becomes a compact top zone: SAVE button on top, then a horizontal tab strip */
                #cms-dashboard-modal .cms-sidebar{width:100% !important;height:auto !important;flex-shrink:0 !important;
                    flex-direction:column !important;gap:8px !important;padding:10px 0 0 0 !important;
                    border-right:none !important;border-bottom:1px solid #eee !important;overflow:hidden !important;
                    box-sizing:border-box !important}
                #cms-dashboard-modal .cms-sidebar h3,#cms-dashboard-modal .cms-sidebar .sub-text,
                #cms-dashboard-modal .cms-sidebar-header,#cms-dashboard-modal .cms-sidebar-footer{display:none !important}
                #cms-dashboard-modal .cms-sidebar .cms-btn-save{margin:0 12px 8px 12px !important;width:calc(100% - 24px) !important}
                /* the tabs scroll horizontally as chips */
                #cms-dashboard-modal .cms-menu{flex-direction:row !important;flex-wrap:nowrap !important;flex-grow:0 !important;
                    gap:0 !important;overflow-x:auto !important;overflow-y:hidden !important;
                    -webkit-overflow-scrolling:touch !important;padding:0 0 8px 12px !important;
                    width:100% !important;box-sizing:border-box !important;
                    scrollbar-width:none !important;-ms-overflow-style:none !important}
                #cms-dashboard-modal .cms-menu::-webkit-scrollbar{display:none !important}
                #cms-dashboard-modal .cms-menu-item{flex:0 0 auto !important;margin-bottom:0 !important;margin-right:8px !important;
                    padding:8px 14px !important;white-space:nowrap !important;font-size:.82rem !important;border-radius:20px !important}
                #cms-dashboard-modal .cms-main-content{padding:15px !important;flex-grow:1;min-height:0;overflow-y:auto}
                #cms-dashboard-modal .cms-content-header h2{font-size:1.05rem !important}
                /* image picker modal stays a centered card, but fits the phone */
                #cms-image-picker-modal .cms-dashboard-container{width:94% !important;max-width:94% !important}
                #cms-image-picker-modal #cms-image-grid{grid-template-columns:repeat(2,1fr) !important}
            }
            @media (max-width:480px){
                .cms-brand-text{display:none !important}
                #cms-admin-bar .cms-mode-indicator{display:none !important}
                #cms-admin-bar{justify-content:flex-end !important}
                .cms-admin-actions{gap:5px !important}
                .cms-admin-actions .cms-btn{padding:9px 10px !important}
            }
        `;
        document.head.appendChild(style);
    },

    // Deter casual image saving for PUBLIC visitors (logged-in admins are unaffected so the
    // CMS image picker / right-click / inspect keeps working). Note: cannot be 100% Ã¢â‚¬&rdquo; screenshots
    // and DevTools can still capture; this blocks right-click "Save image", drag-to-save, etc.
    _protectImages() {
        document.addEventListener('contextmenu', (e) => {
            const t = e.target;
            if (t && (t.tagName === 'IMG' || (t.closest && t.closest('picture')))) e.preventDefault();
        });
        document.addEventListener('dragstart', (e) => {
            if (e.target && e.target.tagName === 'IMG') e.preventDefault();
        });
        if (!document.getElementById('cms-img-protect')) {
            const style = document.createElement('style');
            style.id = 'cms-img-protect';
            style.textContent = 'img{-webkit-user-drag:none;user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none}';
            document.head.appendChild(style);
        }
    },

    async checkAuthStatus() {
        try {
            const response = await fetch(`/api/admin/status`, {
                credentials: 'include'  // Send auth cookie
            });
            const data = await response.json();
            
            // -- SESSION SYNCHRONIZATION --
            // If the server says we are logged in, but the TAB flag is missing,
            // it means the user closed the previous tab/browser and came back.
            const sessionActive = sessionStorage.getItem('cms_tab_session') === 'active';
            const isLoginPage = window.location.pathname.includes('login.html');

            if (data.loggedIn && !sessionActive && !isLoginPage) {
                console.warn('[CMS] Server session active but Tab session missing. Forcing logout.');
                await this.logout();
                this.isLoggedIn = false;
            } else {
                this.isLoggedIn = data.loggedIn;
            }

            document.body.classList.toggle('cms-admin-active', this.isLoggedIn);
        } catch (e) {
            console.error('Auth Check Failed', e);
        }
    },

    /* Helper: Returns a professional default image based on product category */
    _getDocImage(res) {
        const family = (res.product_family || res.category || '').toLowerCase();
        const mapping = {
            'geogrid': 'images/defaults/geogrid_default.png',
            'fabgrid': 'images/defaults/fabgrid_default.png',
            'geocell': 'images/defaults/geocell_default.png',
            'ballastguard': 'images/defaults/ballastguard_default.png',
            'marine': 'images/defaults/marine_default.png',
            'siltguard': 'images/defaults/siltguard_default.png',
            'fps': 'images/defaults/fps_techdoc.svg'
        };
        // Branded "DOWNLOADS" banners per product family
        const downloadMapping = {
            'geogrid': 'images/defaults/geogrid_downloads.svg',
            'fabgrid': 'images/defaults/fabgrid_downloads.svg',
            'geocell': 'images/defaults/geocell_downloads.svg',
            'ballastguard': 'images/defaults/ballastguard_downloads.svg',
            'marine': 'images/defaults/marine_downloads.svg',
            'fps': 'images/defaults/fps_downloads.svg'
        };

        // Prioritize custom thumbnails if they exist, regardless of section
        if (res.thumbnail_url && res.thumbnail_url.trim().length > 0) {
            return res.thumbnail_url.replace(window.location.origin + '/', '');
        }

        // -- AUTOMATIC ENFORCEMENT --
        // Force the branded banner by product family for Technical Datasheets and Downloads,
        // so every card shows a consistent, always-available image (no broken thumbnails).
        if (res.document_type === 'pane-docs' && mapping[family]) {
            return mapping[family];
        }
        if (res.document_type === 'pane-downloads' && downloadMapping[family]) {
            return downloadMapping[family];
        }

        const path = mapping[family] || 'images/resource-thumbnail-default.jpg';
        return path.replace(window.location.origin + '/', ''); 
    },

    setupAutoLogout() {
        // Auto-logout is now handled purely by the server-side session expiry 
        // and the HttpOnly session cookie which browser naturally isolates.
        this.navigatingInternally = false;
    },

    async fetchContent() {
        try {
            const t = Date.now();
            const [v2Res, elementsRes] = await Promise.all([
                fetch(`/api/v2/site-data?t=${t}`, { credentials: 'include' }).catch(e => { console.warn('V2 Site Data fetch failed', e); return null; }),
                fetch(`/api/v2/page-elements/${this.currentPage}?t=${t}`, { credentials: 'include' }).catch(e => { console.warn('Page Elements fetch failed', e); return null; })
            ]);

            // 1. Process Structured Site Data (Solutions, Stories, etc.)
            if (v2Res && v2Res.ok) {
                const v2Data = await v2Res.json();

                // NEW: Sanitize all dynamic data to strip accidental edit-mode artifacts saved to DB
                const sanitizeHtmlField = (val) => {
                    if (typeof val !== 'string') return val;
                    let clean = val.replace(/\s*contenteditable=(['"])true\1/gi, '');
                    clean = clean.replace(/\s*style=(["'])(.*?)\1/gi, (match, quote, styleContent) => {
                        let cleaned = styleContent
                            .replace(/outline:\s*[^;]+;?/gi, '')
                            .replace(/cursor:\s*[^;]+;?/gi, '')
                            .replace(/display:\s*inline-block;?/gi, '')
                            .replace(/padding:\s*2px;?/gi, '');
                        cleaned = cleaned.trim();
                        return cleaned === '' ? '' : ` style=${quote}${cleaned}${quote}`;
                    });
                    return clean;
                };

                ['solutions', 'applications', 'stories', 'resources'].forEach(key => {
                    if (v2Data[key]) {
                        v2Data[key].forEach(item => {
                            if (item.title) item.title = sanitizeHtmlField(item.title);
                            if (item.description) item.description = sanitizeHtmlField(item.description);
                            if (item.content_value) item.content_value = sanitizeHtmlField(item.content_value);
                            // Also clean subtitle/category just in case
                            if (item.subtitle) item.subtitle = sanitizeHtmlField(item.subtitle);
                            if (item.category) item.category = sanitizeHtmlField(item.category);
                        });
                    }
                });

                this.state.solutions = (v2Data.solutions || []).sort((a, b) => {
                    const orderA = parseInt(a.display_order) || 0;
                    const orderB = parseInt(b.display_order) || 0;
                    if (orderA !== orderB) return orderA - orderB;
                    return (parseInt(a.id) || 0) - (parseInt(b.id) || 0);
                }).map(sol => {
                    if (sol.title) {
                        sol.title = sol.title.replace(/BallastGuard\u00AE/gi, 'BallastGuard<sup>&trade;</sup>').replace(/BallastGuard<sup>&reg;<\/sup>/gi, 'BallastGuard<sup>&trade;</sup>');
                    }
                    return sol;
                });
                this.state.applications = v2Data.applications || [];
                this.state.stories = v2Data.stories || [];
                this.state.resources = v2Data.resources || [];

                if (this.currentPage === 'index' || this.currentPage === '' || this.currentPage === 'solutions') {
                    if (this.currentPage === 'solutions') this._renderSolutionsGridFromState();
                    if (this.currentPage === 'index' || this.currentPage === '') {
                        this._renderApplicationsFromState();
                        this._renderIndexSolutionsListFromState();
                    }
                }

                if (this.currentPage === 'resources') this._renderResourcesFromState();
                if (this.currentPage === 'case-studies') this._renderStoriesFromState();

                if (this.currentPage.startsWith('product-detail-') || this.currentPage.startsWith('solution-')) {
                    const currentSlug = this._extractSlugFromUrl();
                    const cleanSlug = currentSlug.replace('solution-', '').replace('product-detail-', '').replace(/s$/, '').replace(/-/g, ''); 
                    const solId = document.body.getAttribute('data-sol-id');
                    
                    console.log(`[CMS] Identifying Solution: solId="${solId}", currentSlug="${currentSlug}", cleanSlug="${cleanSlug}"`);

                    const activeSolution = this.state.solutions.find(s => {
                        // PRIORITY 1: Match by ID (Most robust for dynamic pages)
                        if (solId && s.id === solId) return true;
                        
                        // FALLBACK: Match by Slug (Backward compatibility)
                        const dbSlug = (s.slug || "").toLowerCase();
                        const cleanDbSlug = dbSlug.replace(/s$/, '').replace(/-/g, '');
                        return cleanDbSlug === cleanSlug || dbSlug === currentSlug;
                    });

                    if (activeSolution) {
                        console.log(`[CMS] Active Solution Found: ${activeSolution.title} (ID: ${activeSolution.id})`);
                        this.activeSolution = activeSolution;
                        if (this.state.resources && this.state.resources.length > 0) {
                            this._renderDownloadsFromState(activeSolution);
                        }
                    } else {
                        console.warn(`[CMS] No active solution found for ID: ${solId} or Slug: ${currentSlug}`);
                    }
                }

                if (this.currentPage.startsWith('case-study-')) {
                    const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');
                    const cleanSlug = currentSlug.replace('case-study-', '');
                    let activeStory = this.state.stories.find(s => {
                        const dbSlug = (s.slug || "").toLowerCase();
                        return dbSlug === currentSlug || dbSlug === cleanSlug;
                    });
                    if (!activeStory) {
                        try {
                            const storyRes = await fetch(`/api/v2/stories`, { credentials: 'include' });
                            const allStories = await storyRes.json();
                            activeStory = allStories.find(s => (s.slug || "").toLowerCase() === cleanSlug);
                            if (activeStory) this.state.stories.push(activeStory);
                        } catch (e) { console.error('[CMS] Failed to fetch updated story list', e); }
                    }
                    if (activeStory) {
                        this.activeStory = activeStory;
                        this._renderStoryDetailsFromState(activeStory);
                    }
                }

                // -- NEW: BLOG & WEBINAR DYNAMIC CONTENT SYNC --
                if (this.currentPage.startsWith('blog-') || this.currentPage.startsWith('webinar-')) {
                    const resId = document.body.dataset.resId;
                    if (resId) {
                        let activeRes = this.state.resources.find(r => r.id === resId);
                        if (!activeRes) {
                            try {
                                const resData = await fetch(`/api/v2/resources`, { credentials: 'include' });
                                const allRes = await resData.json();
                                activeRes = allRes.find(r => r.id === resId);
                                if (activeRes) this.state.resources.push(activeRes);
                            } catch (e) { console.error('[CMS] Failed to fetch updated resource list', e); }
                        }
                        if (activeRes) {
                            this.activeResource = activeRes;
                            // Sync title and description to the page if they exist in DB
                            const titleEl = document.querySelector('[data-cms="blog-title"]');
                            if (titleEl && activeRes.title) titleEl.innerHTML = this.sanitizeHtmlField(activeRes.title);
                            
                            const descEl = document.querySelector('[data-cms="blog-description"]') || document.querySelector('[data-cms="blog-content"]');
                            if (descEl && activeRes.description && !descEl.innerHTML.trim()) {
                                // Only sync description if content is empty (initial state)
                                descEl.innerHTML = activeRes.description;
                            }
                        }
                    }
                }
                this._renderRelatedSolutions();
            }

            // 2. Process Page Elements (Individual CMS keys)
            if (elementsRes && elementsRes.ok) {
                const data = await elementsRes.json();
                this.state.pageElements = data;

                if (this.currentPage.startsWith('solution-') || this.currentPage.startsWith('application-') || this.currentPage.startsWith('sub-') || this.currentPage.startsWith('market-')) {
                    this._renderRelatedSolutions(data);
                    this._renderRelatedHighlights(data);
                }
                const layoutItem = data.find(i => i.element_id === 'PAGE_LAYOUT');
                if (layoutItem) {
                    try {
                        const layout = JSON.parse(layoutItem.content_value);
                        this.applyLayout(layout, data);
                    } catch (e) { console.error('Failed to apply structural layout', e); }
                }

                data.forEach(item => {
                    if (item.element_id === 'PAGE_LAYOUT') return;
                    if (item.element_id === 'sol-products-list' && this.currentPage === 'solutions') return;
                    if (item.element_id === 'sol-filters-sidebar') return;
                    if (item.element_id === 'sol-filters-mobile') return;
                    // UUID-based IDs (e.g., story-abc123uuid-img) are always relational
                    // Numeric-based story/res/post/sku IDs are also relational (rendered from their own tables)
                    // BUT feat-\d+- and app-\d+- on the index page are STATIC elements ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â they must load from page_elements
                    const isRelationalEntityElement = /^(story|feat|app|post|res|v2res|sku)-[a-f0-9-]{36}-/.test(item.element_id) || /^(story|res|v2res|post|sku)-\d+-/.test(item.element_id);
                    if (isRelationalEntityElement) return;

                    // ROBUST LINK FIX: For -link elements, apply href to ALL matching <a> elements.
                    // querySelectorAll (not querySelector) is required because Slick slider clones
                    // slides ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â querySelector finds the clone first and misses the original.
                    if ((item.element_id.endsWith('-link') || item.element_id.includes('-link-')) && item.content_type === 'text') {
                        const rawLink = (item.content_value || '').trim();
                        // Case A: value is a full <a> anchor HTML (e.g. CTA buttons saved via the
                        // link editor) Ã¢â‚¬&rdquo; extract its href + label and apply to the live element(s).
                        if (/^<a\b/i.test(rawLink)) {
                            const temp = document.createElement('div');
                            temp.innerHTML = this.sanitizeHtmlField(rawLink);
                            const newA = temp.querySelector('a');
                            if (newA) {
                                const href = (newA.getAttribute('href') || '').replace(/^https?:\/\/baselok\.qpaix\.com/i, '');
                                document.querySelectorAll(`[data-cms="${item.element_id}"]`).forEach(el => {
                                    if (el.tagName === 'A') {
                                        if (href) el.setAttribute('href', href);
                                        // ONLY overwrite innerHTML if it's not a link-only wrapper
                                        if (!el.hasAttribute('data-link-only')) {
                                            el.innerHTML = newA.innerHTML;
                                        }
                                    }
                                });
                            }
                            return;
                        }
                        // Case B: skip values that aren't real URLs/paths (e.g. the visible label
                        // "read more" mistakenly saved as the link) Ã¢â‚¬&rdquo; keep the static href instead.
                        const looksLikeLink = rawLink.length > 0 && !/\s/.test(rawLink) &&
                            (/[\/.]/.test(rawLink) || /^(#|https?:|mailto:|tel:)/i.test(rawLink));
                        if (!looksLikeLink) return;
                        // Strip production domain so links work on localhost too
                        const linkVal = rawLink.replace(/^https?:\/\/baselok\.qpaix\.com/i, '');
                        let found = false;
                        document.querySelectorAll(`[data-cms="${item.element_id}"]`).forEach(el => {
                            if (el.tagName === 'A') {
                                el.href = linkVal;
                                found = true;
                            }
                        });
                        if (!found) {
                            // Fallback for image-parent links: find <a> via its child image's data-cms
                            const imgId = item.element_id.replace(/-link$/, '');
                            document.querySelectorAll(`[data-cms="${imgId}"]`).forEach(imgEl => {
                                const parentLink = imgEl.closest('a');
                                if (parentLink) parentLink.href = linkVal;
                            });
                        }
                        return;
                    }

                    const elements = document.querySelectorAll(`[data-cms="${item.element_id}"]`);
                    elements.forEach(element => {
                        if (item.content_type === 'text') {
                            let safeVal = this.sanitizeHtmlField(item.content_value);

                            // Apply custom formatting rule to Index page solution titles
                            if (item.element_id.startsWith('index-sol-') && item.element_id.endsWith('-title')) {
                                safeVal = this.formatIndexSolutionTitle(item.content_value);
                            }

                            // NEW: Apply dynamic link URL to <a> tags without destroying content (e.g. nested images)
                            if ((item.element_id.endsWith('-link') || item.element_id.includes('-link-')) && element.tagName === 'A') {
                                let hrefVal = item.content_value;
                                if (/^<a\b/i.test(hrefVal)) {
                                    const temp = document.createElement('div');
                                    temp.innerHTML = hrefVal;
                                    const newA = temp.querySelector('a');
                                    if (newA) hrefVal = newA.getAttribute('href') || '';
                                }
                                element.href = hrefVal;
                                return; // Don't proceed to overwrite innerHTML
                            }

                            if (element.tagName === 'A' && safeVal.trim().toLowerCase().startsWith('<a')) {
                                const temp = document.createElement('div');
                                temp.innerHTML = safeVal;
                                const newA = temp.querySelector('a');
                                if (newA) {
                                    element.innerHTML = newA.innerHTML;
                                    element.href = newA.href;
                                }
                            } else if (/^feat-\d+-title$/.test(item.element_id)) {
                                // Apply title span-formatting (red/black split) on load from DB
                                this._applyTitleFormatting(element, item.content_value);
                            } else {
                                element.innerHTML = safeVal;
                            }
                        } else if (item.content_type === 'image') {
                            let finalUrl = item.content_value;
                            if (finalUrl.includes('ngrok-free.dev') || finalUrl.includes('localhost:')) {
                                const imgParts = finalUrl.split('/images/');
                                if (imgParts.length > 1) finalUrl = 'images/' + imgParts[1];
                            }
                            if (element.tagName === 'IMG') {
                                // Preload new image before swapping src to prevent old-image flash
                                const _capturedUrl = finalUrl;
                                const _imgLoadPromise = new Promise(resolve => {
                                    const tmp = new Image();
                                    tmp.onload = () => { element.src = _capturedUrl; resolve(); };
                                    tmp.onerror = () => { element.src = _capturedUrl; resolve(); };
                                    tmp.src = _capturedUrl;
                                });
                                if (!this._pendingImageLoads) this._pendingImageLoads = [];
                                this._pendingImageLoads.push(_imgLoadPromise);
                                // App icon: show img, hide FA icon sibling
                                const cmsKey = element.getAttribute('data-cms') || '';
                                if (cmsKey.startsWith('app-') && cmsKey.endsWith('-icon') && finalUrl) {
                                    element.style.display = 'block';
                                    const faIcon = element.parentElement?.querySelector('i.fa');
                                    if (faIcon) faIcon.style.display = 'none';
                                }
                            } else element.style.backgroundImage = `url("${finalUrl}")`;
                        }
                    });
                });

            // 3. Load bpro-global-* keys from index slug explicitly so they
            // always reflect global saved values on every application/sub page,
            // regardless of whether the backend merges index into page responses.
            const bproGlobalEls = ['bpro-global-logo', 'bpro-global-device', 'bpro-global-heading', 'footer-baba-logo', 'footer-iso-logo'];
            const hasBproSection = bproGlobalEls.some(k => document.querySelector(`[data-cms="${k}"]`));
            if (hasBproSection && this.currentPage !== 'index' && this.currentPage !== '') {
                try {
                    const indexRes2 = await fetch(`/api/v2/page-elements/index?t=${Date.now()}`, { credentials: 'include' });
                    if (indexRes2 && indexRes2.ok) {
                        const indexData = await indexRes2.json();
                        indexData.forEach(item => {
                            if (!bproGlobalEls.includes(item.element_id)) return;
                            document.querySelectorAll(`[data-cms="${item.element_id}"]`).forEach(element => {
                                if (item.content_type === 'image' && element.tagName === 'IMG') {
                                    let url = item.content_value || '';
                                    if (url.includes('ngrok-free.dev') || url.includes('localhost:')) {
                                        const parts = url.split('/images/');
                                        if (parts.length > 1) url = '/images/' + parts[1];
                                    }
                                    if (url) element.src = url;
                                } else if (item.content_type === 'text') {
                                    element.innerHTML = this.sanitizeHtmlField(item.content_value);
                                }
                            });
                        });
                    }
                } catch (e) {
                    console.warn('[CMS] bpro-global fetch from index failed:', e);
                }
            }
            this.initPremiumDownloadCards();
            }
        } catch (e) {
            console.warn('CMS fetch error:', e);
        } finally {
            // Preloader removal is now handled centrally in init() after mainImage sync
        }
    },

    /* Render DYNAMIC latest articles (Blogs/Webinars) with Slick Slider */
    _renderDynamicLatestArticles() {
        const container = document.getElementById('dynamic-latest-articles-row');
        if (!container || !this.state.resources || this.state.resources.length === 0) return;

        // Filter for Blogs and Webinars only
        let articles = this.state.resources.filter(r =>
            r.document_type === 'pane-blog' || r.document_type === 'pane-webinar'
        );

        // Sort by ID descending (Latest First)
        articles.sort((a, b) => b.id - a.id);

        // Take top 8 latest entries
        articles = articles.slice(0, 8);

        if (articles.length === 0) {
            container.innerHTML = '<div class="col-lg-12 text-center text-muted p-5">No recent articles found.</div>';
            return;
        }

        // Standardized Card Template
        container.innerHTML = articles.map(res => `
            <div class="col-lg-4">
                <div class="featured-imagebox featured-imagebox-post style1" style="height:100%; display:flex; flex-direction:column; margin: 10px;">
                    <div class="featured-thumbnail" style="aspect-ratio: 16/10; overflow: hidden; background: #f4f4f4;">
                        <img class="img-fluid w-100" src="${res.thumbnail_url}" alt="${res.title}" style="width: 100% !important; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div class="featured-content" style="flex-grow:1; display:flex; flex-direction:column;">
                        <div class="ttm-box-post-date">
                            <span class="ttm-entry-date">${res.document_type === 'pane-blog' ? 'Article' : 'Webinar'}</span>
                        </div>
                        <div class="post-meta">
                            <span class="ttm-meta-line byline">${new Date(res.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
                        </div>
                        <div class="featured-title">
                            <h3 style="font-size: 1.1rem; min-height: 2.8em; line-height: 1.4;"><a href="${res.file_url}">${this.sanitizeHtmlField(res.title)}</a></h3>
                        </div>
                        <div class="featured-desc" style="flex-grow:1;">
                           <p style="font-size: 0.9rem; line-height: 1.6; color: #666;">${this.sanitizeHtmlField(res.description ? (res.description.length > 110 ? res.description.substring(0, 110) + '...' : res.description) : 'Explore our latest industry insights and technical resources for infrastructure stabilization.')}</p>
                        </div>
                        <a class="ttm-btn ttm-btn-size-md ttm-btn-color-dark btn-inline" href="${res.file_url}">read more</a>
                    </div>
                </div>
            </div>
        `).join('');

        // Initialize/Refresh Slick Slider
        const initSlider = () => {
            // Check if Slick is already loaded
            if (typeof jQuery.fn.slick !== 'function') {
                console.warn('[CMS] Slick Slider not loaded yet, retrying...');
                setTimeout(initSlider, 200);
                return;
            }

            if (jQuery(container).hasClass('slick-initialized')) {
                jQuery(container).slick('unslick');
            }

            jQuery(container).slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: articles.length > 3,
                prevArrow: '<button type="button" class="cms-slick-arrow cms-slick-prev" aria-label="Previous"><i class="fa fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="cms-slick-arrow cms-slick-next" aria-label="Next"><i class="fa fa-chevron-right"></i></button>',
                dots: false,
                autoplay: true,
                autoplaySpeed: 5000,
                infinite: articles.length > 3,
                responsive: [
                    { breakpoint: 1024, settings: { slidesToShow: 3 } },
                    { breakpoint: 900, settings: { slidesToShow: 2, arrows: false, dots: true } },
                    { breakpoint: 575, settings: { slidesToShow: 1, arrows: true, dots: false } }
                ]
            });
            console.log(`[CMS] Dynamic Articles Slider initialized with ${articles.length} items.`);
        };

        // Small delay to ensure DOM is updated and Slick is ready
        setTimeout(initSlider, 300);

        // Intercept clicks on dynamic cards in edit mode
        container.addEventListener('click', (e) => {
            if (this.isEditing) {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('This is a dynamic article section. To edit the photo or text, you must edit the original Resource.\n\nClick OK to go to the Resources page.')) {
                    window.location.href = 'resources.html';
                }
            }
        }, { capture: true });
    },

    _renderDynamicCaseStudies() {
        const container = document.getElementById('dynamic-case-studies-row');
        if (!container) return;

        console.log('[CMS] Rendering Dynamic Project Highlights...');

        if (!this.state.stories || this.state.stories.length === 0) {
            container.innerHTML = '<div class="col-12 text-center p-5"><h3>No Project Highlights found.</h3></div>';
            return;
        }

        // Standard card template for Project Highlights on resources page
        const html = this.state.stories.map(story => {
            // Prioritize products_used for filtering and display
            let categoryRaw = story.products_used || 'General';
            if (categoryRaw.length > 30) { // If it's a UUID, try to find the solution title
                const solution = this.state.solutions.find(s => s.id === story.products_used) || this.state.solutions.find(s => s.id === story.related_solution_id);
                if (solution) categoryRaw = solution.title;
            }
            const category = (categoryRaw || '').replace(/<[^>]*>/g, '');

            return `
                <div class="story-carousel-item" data-story-id="${story.id}">
                    <div class="featured-imagebox featured-imagebox-post style1 mx-2">
                        <div class="featured-thumbnail" style="aspect-ratio: 16 / 9; overflow: hidden; background: #f4f4f4; border-radius: 8px 8px 0 0;">
                            <img class="img-fluid w-100" src="${story.hero_image_url || 'images/stories/story-geogrid.png'}" alt="${story.title}" data-cms="story-carousel-${story.id}-img" style="width: 100% !important; height: 100%; object-fit: cover; display: block;">
                        </div>
                        <div class="featured-content" style="padding: 20px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; background: #fff; min-height: 220px; display: flex; flex-direction: column;">
                            <div class="ttm-box-post-date" style="background: transparent !important; height: auto !important; width: auto !important; padding: 0 !important; text-align: center;">
                                <span class="ttm-entry-date" style="background: #d11f26; color: #fff !important; padding: 4px 12px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; display: inline-block;">${category}</span>
                            </div>
                            <div class="post-meta" style="margin-bottom: 8px;">
                                <span class="ttm-meta-line byline" style="font-size: 0.75rem; color: #777;"><i class="fa fa-map-marker" style="color: #d11f26; margin-right: 5px;"></i>${story.location || 'Baton Rouge, LA'}</span>
                            </div>
                            <div class="featured-title" style="margin-bottom: 12px; flex-grow: 0;">
                                <h3 style="font-size: 1.1rem; line-height: 1.4; margin: 0;"><a href="case-study-${story.slug}.html" style="color: #222; text-decoration: none;" data-cms="story-carousel-${story.id}-title">${this.sanitizeHtmlField(story.title)}</a></h3>
                            </div>
                            <div class="featured-desc" style="font-size: 0.85rem; color: #555; margin-bottom: 15px;">
                                <p style="margin: 0 0 5px 0;"><b>Application: </b> ${story.application || 'Soil Reinforcement'}</p>
                                <p style="margin: 0;"><b>Benefit: </b> ${story.project_benefits || 'Efficiency & Cost Savings'}</p>
                            </div>
                            <div>
                                <a class="ttm-btn ttm-btn-size-md ttm-btn-color-dark btn-inline" href="case-study-${story.slug}.html" style="font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">read more <i class="fa fa-chevron-right" style="margin-left: 5px; font-size: 0.6rem;"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // 1. Initial injection
        container.innerHTML = html;

        // 2. Clear loader if it exists
        const loader = document.getElementById('dynamic-stories-loader');
        if (loader) loader.style.display = 'none';

        // 3. Initialize Slick Slider
        setTimeout(() => {
            if (jQuery(container).hasClass('slick-initialized')) {
                jQuery(container).slick('unslick');
            }

            jQuery(container).slick({
                dots: false,
                arrows: true,
                prevArrow: '<button type="button" class="cms-slick-arrow cms-slick-prev" aria-label="Previous"><i class="fa fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="cms-slick-arrow cms-slick-next" aria-label="Next"><i class="fa fa-chevron-right"></i></button>',
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
            console.log('[CMS] Project Highlights Slider Initialized');
        }, 100);
    },

    /* Render stories FROM the v2 state object into the DOM */
    _renderStoriesFromState() {
        const container = document.querySelector('.case-studies-row') || document.querySelector('#grid-stories');
        if (!container || !this.state.stories || this.state.stories.length === 0) return;
        console.log(`[CMS] Rendering ${this.state.stories.length} stories into ${container.id || 'container'}...`);

        // Only clear if we have data to replace with
        container.innerHTML = '';

        this.state.stories.forEach((story, idx) => {
            const nextIdx = idx + 1;
            // Prioritize products_used for data-category and badge
            let catRaw = story.products_used || 'General';
            if (catRaw.length > 30) { // Handle legacy UUIDs
                const matchingSolution = this.state.solutions.find(s => s.id === story.products_used) || this.state.solutions.find(s => s.id === story.related_solution_id);
                if (matchingSolution) catRaw = matchingSolution.title;
            }
            const cat = (catRaw || '').replace(/<[^>]*>/g, '');
            const storyUrl = story.slug ? `case-study-${story.slug}.html` : '#';

            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 product-item';
            col.setAttribute('data-category', cat);
            col.setAttribute('data-story-id', story.id);

            col.innerHTML = `
                <div class="product-card">
                    <div class="product-img">
                        <a href="${storyUrl}">
                            <img src="${story.hero_image_url || ''}" class="img-fluid w-100" alt="${story.title}" data-cms="story-${story.id}-img">
                        </a>
                    </div>
                    <div class="pt-3">
                        <div class="story-meta">
                            <span class="badge bg-danger text-white" style="font-size: 0.6rem; padding: 4px 10px; text-transform: uppercase; border-radius: 4px;">${cat}</span>
                            <small style="color: #94a3b8; font-weight: 600;"><i class="fa fa-map-marker text-danger"></i> ${story.location || 'USA'}</small>
                        </div>
                        <h6 style="margin-bottom: 10px;">
                            <a href="${storyUrl}" data-cms="story-${story.id}-title">${this.sanitizeHtmlField(story.title)}</a>
                        </h6>
                        <div data-cms="story-${nextIdx}-desc" style="margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; font-size: 15px; line-height: 1.6; color: #666;">${this.sanitizeHtmlField((story.challenge_text || story.description || 'View detailed project engineering results.').replace(/<[^>]*>?/gm, ''))}</div>
                        <a href="${storyUrl}" class="read-more-link">
                            Case Study <i class="fa fa-chevron-right" style="font-size: 0.7rem;"></i>
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });

        // Apply current filter to newly rendered items
        this.applyCurrentFilter();
    },

    /* Render resources FROM the v2 state object into the DOM */
    _renderResourcesFromState() {
        if (this.state.resources.length === 0) return;

        this.state.resources.forEach((res, idx) => {
            const tab = res.document_type || 'pane-docs';

            const gridId = tab.replace('pane-', 'grid-');
            const container = document.getElementById(gridId);
            if (!container) return;

            // Check if already on page by some unique marker?
            // For now, let's just append if not exists
            if (container.querySelector(`[data-res-id="${res.id}"]`)) return;

            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 product-item';
            col.setAttribute('data-category', res.category);
            col.setAttribute('data-res-id', res.id);

            let badgeClass = 'badge-doc';
            let badgeText = 'Technical Doc';
            if (tab === 'pane-downloads') { badgeClass = 'badge-download'; badgeText = 'Download'; }
            if (tab === 'pane-videos') { badgeClass = 'badge-video'; badgeText = 'Video'; }
            if (tab === 'pane-blog') { badgeClass = 'badge-blog'; badgeText = 'Blog'; }
            if (tab === 'pane-webinar') { badgeClass = 'badge-webinar'; badgeText = 'Webinar'; }
            if (tab === 'pane-events') { badgeClass = 'badge-whitepaper'; badgeText = 'White Paper'; }

            const finalLink = res.file_url;
            const docImg = this._getDocImage(res);
            let cardMedia = `
                <a href="${finalLink}" ${(tab === 'pane-blog' || tab === 'pane-webinar') ? '' : 'target="_blank"'}>
                    <img src="${docImg}" data-cms="v2res-${res.id}-img">
                </a>`;

            if (tab === 'pane-videos') {
                let videoSrc = finalLink;
                if (!videoSrc.startsWith('http')) {
                    videoSrc = `https://www.youtube.com/embed/${videoSrc}`;
                } else if (videoSrc.includes('watch?v=')) {
                    videoSrc = videoSrc.replace('watch?v=', 'embed/');
                }

                cardMedia = `
                    <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
                        <iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                            src="${videoSrc}" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                    </div>`;
            }

            col.innerHTML = `
                <div class="product-card">
                    <div class="product-img">
                        ${cardMedia}
                    </div>
                    <div class="pt-3">
                        <span class="resource-badge ${badgeClass}">${badgeText}</span>
                        <h6><a href="${finalLink}" ${(tab === 'pane-videos' || tab === 'pane-blog' || tab === 'pane-webinar') ? '' : 'target="_blank"'} class="text-dark" style="text-decoration:none; display:inline-block;" data-cms="v2res-${res.id}-title">${this.sanitizeHtmlField(res.title)}</a></h6>
                        <p data-cms="v2res-${res.id}-desc">${this.sanitizeHtmlField(res.description || 'Click to access the content.')}</p>
                        <div class="resource-meta mt-2">
                           ${tab === 'pane-videos' ? '' : `<a href="${finalLink}" ${(tab === 'pane-blog' || tab === 'pane-webinar') ? '' : 'target="_blank"'} class="ttm-textcolor-skincolor"><i class="fa ${tab === 'pane-blog' ? 'fa-file-text' : 'fa-file-pdf'} me-1"></i> ${tab === 'pane-blog' ? 'Read Blog' : 'Access File'} <i class="fa fa-chevron-right ml-1" style="font-size:10px;"></i></a>`}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });

        // Apply current filter to newly rendered items
        this.applyCurrentFilter();
    },


    /* Render solutions FROM the database onto the Solutions Matrix page (solutions.html) */
    _renderSolutionsGridFromState() {
        const container = document.getElementById('solutions-product-list');
        if (!container) return;

        if (!this.state.solutions || !this.state.solutions.length === 0) {
            container.innerHTML = '<div class="col-12 text-center py-5"><h3 class="text-muted">No solutions found.</h3></div>';
            return;
        }

        const html = this.state.solutions.map(sol => {
            let finalLink = sol.custom_link;
            if (!finalLink) {
                const title = (sol.title || "").toLowerCase();
                if (title.includes('geogrid')) finalLink = 'product-detail-geogrids.html';
                else if (title.includes('fabgrid')) finalLink = 'product-detail-fabgrid.html';
                else if (title.includes('geocell')) finalLink = 'product-detail-geocell.html';
                else if (title.includes('ballastguard')) finalLink = 'product-detail-ballastguard.html';
                else if (title.includes('siltguard')) finalLink = 'product-detail-siltguard.html';
                else if (title.includes('marine')) finalLink = 'product-detail-marine.html';
                else finalLink = 'solution-' + (sol.slug || this.slugify(sol.title)) + '.html';
            }

            return `
                <div class="col-lg-4 col-md-6 product-item" data-category="${sol.category || ''}" data-sol-id="${sol.id}">
                    <div class="featured-imagebox featured-imagebox-services style1" style="height:100%; display:flex; flex-direction:column; border: 1px solid #eee; transition: all 0.3s ease;">
                        <div class="featured-thumbnail" style="aspect-ratio: 4/3; overflow: hidden; position: relative;">
                            <a href="${finalLink}">
                                <img class="img-fluid w-100 h-100" src="${sol.icon_image_url || 'images/products/prod_geogrid.png'}" alt="${sol.title}" style="object-fit: cover;" data-cms="sol-${sol.id}-img">
                            </a>
                        </div>
                        <div class="featured-content pt-3 px-3" style="flex-grow:1; display:flex; flex-direction:column; padding-bottom:12px;">
                            <div class="featured-title">
                                <h3 style="font-size: 1.15rem; margin-bottom: 2px;">
                                    <a href="${finalLink}" data-cms="sol-${sol.id}-title">${this.sanitizeHtmlField(sol.title)}</a>
                                </h3>
                            </div>
                            <div class="featured-desc" style="margin-bottom: 10px;">
                                <p style="font-size: 0.85rem; color: #666; line-height: 1.5; height: 3em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;" data-cms="sol-${sol.id}-desc">
                                    ${this.sanitizeHtmlField(sol.short_description || sol.description || 'Professional reinforcement and stabilization solution for infrastructure projects.')}
                                </p>
                            </div>
                            <a href="${finalLink}"
                               class="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-skincolor" style="font-weight:700; text-transform:uppercase; margin-top:auto;">READ MORE</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
        if (this.editMode) this.enableEditing(container);
        console.log(`[CMS] Rendered ${this.state.solutions.length} solutions into the grid.`);
        this.applyCurrentFilter(); // Apply any active filter if set
    },

    formatIndexSolutionTitle(text) {
        if (!text) return '';
        // Strip any existing HTML to avoid messing up nested spans if user edited rich text
        let cleanText = text.replace(/<[^>]*>?/gm, '').trim();
        let words = cleanText.split(/\s+/);
        
        let formattedWords = words.map(word => {
            let len = word.length;
            if (len === 0) return '';
            
            let redCount = Math.floor(len / 2);
            let redPart = word.substring(0, redCount);
            let blackPart = word.substring(redCount);
            
            return `<span>${redPart}</span>${blackPart}`;
        });
        
        let finalHtml = formattedWords.join(' ');
        finalHtml = finalHtml.replace(/<sup>\u00AE<\/sup>|<sup>&reg;<\/sup>/gi, '\u00AE')
                             .replace(/<sup>\u2122<\/sup>|<sup>&trade;<\/sup>/gi, '\u2122')
                             .replace(/\u00AE|&reg;/gi, '<sup>&reg;</sup>')
                             .replace(/\u2122|&trade;/gi, '<sup>&trade;</sup>');
                             
        return finalHtml;
    },

    _renderIndexSolutionsListFromState() {
        const container = document.getElementById('index-solutions-list');
        if (!container) return;

        if (!this.state.solutions || this.state.solutions.length === 0) {
            container.innerHTML = '<div class="col-12 text-center py-5"><h3 class="text-muted">No solutions found.</h3></div>';
            return;
        }

        const displaySolutions = this.state.solutions.slice(0, 6);
        const hasMore = this.state.solutions.length > 6;

        let html = displaySolutions.map(sol => {
            let finalLink = sol.custom_link;
            if (!finalLink) {
                const title = (sol.title || "").toLowerCase();
                if (title.includes('geogrid')) finalLink = 'solution-baselok-geogrid.html';
                else if (title.includes('fabgrid')) finalLink = 'solution-fabgrid.html';
                else if (title.includes('geocell')) finalLink = 'solution-geocell.html';
                else if (title.includes('ballastguard')) finalLink = 'solution-ballastguard.html';
                else if (title.includes('siltguard')) finalLink = 'solution-slitguard.html';
                else if (title.includes('marine')) finalLink = 'solution-marine.html';
                else finalLink = 'solution-' + (sol.slug || this.slugify(sol.title)) + '.html';
            }

            // Apply the user's specific half-red, half-black mathematical rule to the title
            let titleHtml = this.formatIndexSolutionTitle(sol.title || 'Solution');
            
            return `
                  <div class="col-md-4 col-sm-4">
                    <div class="featured-icon-box icon-align-top-content style1">
                      <div class="featured-content">
                        <div class="featured-title">
                          <h3 data-cms="index-sol-${sol.id}-title">${titleHtml}</h3>
                        </div>
                        <div class="featured-desc">
                          <p data-cms="index-sol-${sol.id}-desc" style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;">
                            ${this.sanitizeHtmlField(sol.short_description || sol.description || 'Professional reinforcement and stabilization solution for infrastructure projects.')}
                          </p>
                        </div>
                        <a class="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-skincolor" href="${finalLink}" data-cms="index-sol-${sol.id}-link">READ MORE</a>
                      </div>
                    </div>
                  </div>
            `;
        }).join('');

        if (hasMore) {
            html += `
                <div class="col-lg-12 text-center mt-4">
                    <a class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-dark" href="solutions.html#solutions-product-list">VIEW MORE</a>
                </div>
            `;
        }

        container.innerHTML = html;
        if (this.editMode) this.enableEditing(container);
        console.log(`[CMS] Rendered ${displaySolutions.length} solutions to index page.`);
    },

    /* Render applications FROM the v2 state object into the slider */
    _renderApplicationsFromState() {
        const container = document.querySelector('.application-slider .slick_slider') ||
            document.querySelector('.application-slider .row');
        if (!container || this.state.applications.length === 0) return;
        // Applications are slider-based, so we just note the state is available
        // Actual slick re-render is handled by applyLayout on the layout object
    },

    /* -- DYNAMIC FILTERING ------------------------------------------- */

    initFilters() {
        // Use event delegation for both horizontal and sidebar filters
        const filterContainers = [
            '.horizontal-product-filter',
            '.product-btn-group',
            '.category-filter',
            '.vertical-product-filter'
        ];

        filterContainers.forEach(selector => {
            const container = document.querySelector(selector);
            if (!container) return;

            container.addEventListener('click', (e) => {
                const btn = e.target.closest('.product-btn') || e.target.closest('[data-filter]');
                if (!btn) return;

                e.preventDefault();
                const filterValue = btn.getAttribute('data-filter');
                if (!filterValue) return;

                console.log(`[CMS] Filter Clicked: ${filterValue}`);
                this.state.activeFilter = filterValue;

                // Update active states for ALL buttons with this filter
                document.querySelectorAll(`.product-btn, [data-filter]`).forEach(b => {
                    b.classList.toggle('active', b.getAttribute('data-filter') === filterValue);
                });

                this.applyCurrentFilter();
            });
        });

        // Re-apply filter when switching tabs (Resources page)
        const tabEl = document.getElementById('resourceTabs');
        if (tabEl) {
            tabEl.addEventListener('shown.bs.tab', (e) => {
                console.log('[CMS] Tab switched, re-applying filter...');

                // Manual fix for dual active tabs: Ensure only the clicked tab has 'active' class
                const allTabs = tabEl.querySelectorAll('.nav-link');
                allTabs.forEach(tab => {
                    if (tab !== e.target) {
                        tab.classList.remove('active');
                    }
                });

                this.applyCurrentFilter();
            });
        }
    },

    applyCurrentFilter() {
        const filter = this.state.activeFilter || 'all';
        const items = document.querySelectorAll('.product-item');
        if (items.length === 0) return;

        console.log(`[CMS] Applying Filter: ${filter} to ${items.length} items.`);

        items.forEach(item => {
            const itemCatStr = item.getAttribute('data-category') || '';
            const itemCats = itemCatStr.split(',').map(c => c.trim().toLowerCase());
            const filterLower = filter.toLowerCase();

            if (filterLower === 'all') {
                item.style.display = ""; // Remove inline override to respect grid classes
                item.classList.remove('d-none');
                return;
            }

            const isVisible = itemCats.some(c => c.includes(filterLower));

            if (isVisible) {
                item.style.display = "";
                item.classList.remove('d-none');
            } else {
                item.classList.add('d-none'); // Use d-none for standard Bootstrap hiding
            }
        });

        // Special handling for Resources page: Update main title and "No Results" messages
        this._updateResourceUI(filter);
    },

    _updateResourceUI(filter) {
        const titleElement = document.getElementById('resource-main-title');
        if (titleElement) {
            const activeBtn = document.querySelector(`.product-btn.active[data-filter="${filter}"]`);
            const filterLabel = (filter === 'all' || !activeBtn) ? 'All Products' : activeBtn.textContent.trim();
            titleElement.innerHTML = `${filterLabel} Construction & Civil Engineering <b>Resources</b>`;
        }

        // Show/Hide "No Results" blocks only for the active tab to avoid overlap
        const activeTabBtn = document.querySelector('#resourceTabs .nav-link.active');
        const activePaneId = activeTabBtn ? activeTabBtn.getAttribute('data-bs-target').replace('#', '') : 'pane-docs';
        const activeGridId = activePaneId.replace('pane-', 'grid-');


        const grids = ['grid-docs', 'grid-blog', 'grid-webinar', 'grid-downloads', 'grid-videos', 'grid-events'];
        grids.forEach(gridId => {
            const grid = document.getElementById(gridId);
            const noMsgId = gridId.replace('grid-', 'no-');
            const noMsg = document.getElementById(noMsgId);

            if (!grid || !noMsg) return;

            // Evaluate and set display for all grids (Bootstrap handles hiding inactive tab panes)
            const visibleItems = Array.from(grid.querySelectorAll('.product-item')).filter(i => !i.classList.contains('d-none') && i.style.display !== 'none');
            noMsg.style.display = visibleItems.length === 0 ? 'block' : 'none';
        });
    },


    _applyTitleFormatting(element, value) {
        if (!element || !value) return;
        const val = value.trim().toUpperCase();
        if (val.includes('GRID') && val !== 'GRID') {
            const prefix = val.split('GRID')[0];
            const suffix = val.substring(val.indexOf('GRID') + 4);
            element.innerHTML = `<span>${prefix}</span>GRID${suffix}`;
        } else if (val.includes('CELL') && val !== 'CELL') {
            const prefix = val.split('CELL')[0];
            const suffix = val.substring(val.indexOf('CELL') + 4);
            element.innerHTML = `<span>${prefix}</span>CELL${suffix}`;
        } else if (val.includes('BALLAST') || val.includes('BALLAS')) {
            element.innerHTML = `<span>BALLAST</span>GUARD<sup>&reg;</sup>`;
        } else if (val.includes('SILT')) {
            element.innerHTML = `<span>SILT</span>GUARD<sup>&reg;</sup>`;
        } else {
            // Split by words instead of arbitrary characters to avoid cutting words in half
            const words = val.split(/\s+/);
            if (words.length > 1) {
                const half = Math.ceil(words.length / 2);
                const redPart = words.slice(0, half).join(' ');
                const blackPart = words.slice(half).join(' ');
                element.innerHTML = `<span>${redPart}</span> ${blackPart}`;
            } else {
                element.innerHTML = value;
            }
        }

        // Ensure trademark symbols in the final HTML get superscripted correctly
        if (element.innerHTML.includes('®') || element.innerHTML.includes('™') || element.innerHTML.includes('&reg;') || element.innerHTML.includes('&trade;')) {
            element.innerHTML = element.innerHTML
                .replace(/<sup>\u00AE<\/sup>|<sup>&reg;<\/sup>/gi, '\u00AE')
                .replace(/<sup>\u2122<\/sup>|<sup>&trade;<\/sup>/gi, '\u2122')
                .replace(/\u00AE|&reg;/gi, '<sup>&reg;</sup>')
                .replace(/\u2122|&trade;/gi, '<sup>&trade;</sup>');
        }
    },

    stripHtml(html) {
        if (!html) return "";
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    },

    showStatus(message, type = 'success') {
        let toast = document.querySelector('.cms-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'cms-toast';
            document.body.appendChild(toast);
        }

        toast.className = `cms-toast cms-toast-${type}`;
        toast.innerHTML = `<i class="fa ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    confirmAction(message, onConfirm) {
        this.showConfirm('Confirmation', message).then(ok => {
            if (ok) onConfirm();
        });
    },

    showAlert(title, message) {
        this._showAlertAsync(title, message);
    },

    showConfirm(title, message) {
        return this._showConfirmAsync(title, message);
    },

    showAdminBar() {
        if (document.getElementById('cms-admin-bar')) return;
        const adminBar = document.createElement('div');
        adminBar.id = 'cms-admin-bar';
        adminBar.innerHTML = `
            <div class="cms-brand-text">BASELOK CMS - ${this.currentPage.toUpperCase().replace(/-/g, ' ')}</div>
            <div id="cms-mode-indicator" class="cms-mode-indicator">PREVIEW MODE ACTIVE</div>
            <div class="cms-admin-actions">
                <button class="cms-btn cms-btn-save" id="btn-cms-save-main"><i class="fa fa-floppy-o"></i> SAVE</button>
                <button class="cms-btn cms-btn-dashboard" id="btn-cms-open-dashboard"><i class="fa fa-th-large"></i> DASHBOARD</button>
                <button class="cms-btn cms-btn-reset" id="btn-cms-preview"><i class="fa fa-pencil"></i> SWITCH TO EDIT</button>
                <button class="cms-btn cms-btn-logout" onclick="CMS.logout()"><i class="fa fa-sign-out"></i> LOGOUT</button>
            </div>
        `;
        document.body.prepend(adminBar);

        document.getElementById('btn-cms-save-main').onclick = () => this.saveAll();
        document.getElementById('btn-cms-open-dashboard').onclick = () => this.openDashboard();
        document.getElementById('btn-cms-preview').onclick = () => this.togglePreview();
    },

    injectDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'cms-dashboard-modal';
        dashboard.className = 'cms-modal';
        dashboard.innerHTML = `
            <div class="cms-dashboard-container">
                <div class="cms-sidebar">
                    <h3>Dashboard</h3>
                    <span class="sub-text">MANAGE CONTENT</span>
                    
                    <button class="cms-btn cms-btn-save w-100 justify-content-center mb-3" id="btn-cms-dashboard-save">
                        <i class="fa fa-save"></i> SAVE CHANGES
                    </button>

                    <ul class="cms-menu">
                        <li class="cms-menu-item active" data-tab="overview"><i class="fa fa-home"></i> Overview</li>
                        <li class="cms-menu-item" data-tab="pages-content"><i class="fa fa-edit"></i> Edit This Page</li>
                        <li class="cms-menu-item" data-tab="pages"><i class="fa fa-file-text-o"></i> All Pages</li>
                        <li class="cms-menu-item" data-tab="hero"><i class="fa fa-clone"></i> Hero Section</li>
                        <li class="cms-menu-item" data-tab="pages-content"><i class="fa fa-align-left"></i> Page Body Elements</li>
                        <li class="cms-menu-item" data-tab="applications-config"><i class="fa fa-sitemap"></i> Application Pages Config</li>
                        <li class="cms-menu-item" data-tab="solutions"><i class="fa fa-cubes"></i> Product Solutions</li>
                        <li class="cms-menu-item" data-tab="case-studies"><i class="fa fa-folder-open"></i> Project Highlights</li>
                        <li class="cms-menu-item" data-tab="resources-page"><i class="fa fa-download"></i> Resources</li>
                        <li class="cms-menu-item" data-tab="support"><i class="fa fa-users"></i> Support Team</li>
                        <li class="cms-menu-item" data-tab="locations"><i class="fa fa-map-marker"></i> Regional Offices</li>
                        <li class="cms-menu-item" data-tab="media"><i class="fa fa-picture-o"></i> Media Library</li>
                        <li class="cms-menu-item" data-tab="history"><i class="fa fa-history"></i> Change History</li>
                    </ul>
                </div>

                <div class="cms-main-content">
                    <div class="cms-content-header">
                        <h2 id="cms-tab-title">Overview</h2>
                        <i class="fa fa-times cms-close-btn" onclick="CMS.closeDashboard()"></i>
                    </div>
                    <div id="cms-tab-content">
                         <!-- Dynamically Injected -->
                    </div>
                </div>
            </div>
            
            <!-- Image Picker Modal -->
            <div id="cms-image-picker-modal" class="cms-modal" style="display:none; z-index: 25000;">
                <div class="cms-dashboard-container" style="width: 600px; height: auto; max-height: 80vh; flex-direction: column;">
                    <div class="cms-content-header" style="padding: 20px; border-bottom: 1px solid #eee; margin:0;">
                        <h2 style="font-size:1.1rem;">Media Library</h2>
                        <i class="fa fa-times cms-close-btn" onclick="document.getElementById('cms-image-picker-modal').style.display='none'"></i>
                    </div>
                    <div style="padding: 20px; overflow-y: auto;">
                        <button class="cms-btn cms-btn-save w-100 mb-3 justify-content-center" onclick="document.getElementById('cms-global-file-input').click()">
                            <i class="fa fa-upload"></i> UPLOAD NEW IMAGE
                        </button>
                        <h5 style="margin-top: 20px; font-size: 0.9rem; text-transform:uppercase; color:#777;">Existing Images on Page</h5>
                        <div id="cms-image-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px;">
                            <!-- images injected here -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hidden File Input for Image Editing -->
            <input type="file" id="cms-global-file-input" style="display:none">
        `;
        document.body.appendChild(dashboard);
        this.dashboardModal = dashboard;

        // Bind events
        const pageNav = document.getElementById('cms-page-nav');
        if (pageNav) {
            pageNav.onchange = (e) => {
                if (!e.target.value) return;
                const url = new URL(e.target.value, window.location.origin);
                url.searchParams.set('cms_dashboard', 'true');
                const activeTab = dashboard.querySelector('.cms-menu-item.active')?.getAttribute('data-tab');
                if (activeTab && activeTab !== 'overview') {
                    url.searchParams.set('cms_tab', activeTab);
                }
                this.navigatingInternally = true;
                window.location.href = url.toString();
            };
        }
        document.getElementById('btn-cms-dashboard-save').onclick = () => this.saveAll();

        const menuItems = dashboard.querySelectorAll('.cms-menu-item');
        menuItems.forEach(item => {
            item.onclick = () => {
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.renderTab(item.getAttribute('data-tab'));
            };
        });

        this.updateSidebarMenu();
        this.renderTab('overview');
    },

    updateSidebarMenu() {
        if (!this.dashboardModal) return;
        const menuItems = this.dashboardModal.querySelectorAll('.cms-menu-item');

        // Whitelist of allowed tabs per user request:
        // Overview, All pages, Solutions, Project Highlights, Resources, Support Team, Regional Offices, Media Library, and Change History
        const allowedTabs = ['overview', 'pages', 'solutions', 'case-studies', 'resources-page', 'support', 'locations', 'media', 'history', 'applications-config'];

        menuItems.forEach(item => {
            const tab = item.getAttribute('data-tab');
            const visible = allowedTabs.includes(tab);
            item.style.display = visible ? 'flex' : 'none';
        });
    },

    renderTab(tab) {
        const content = document.getElementById('cms-tab-content');
        const title = document.getElementById('cms-tab-title');
        title.innerText = tab.charAt(0).toUpperCase() + tab.slice(1);
        
        this.activeTab = tab;

        switch (tab) {
            case 'overview':
                content.innerHTML = `
                    <div class="cms-stats-grid">
                        <div class="cms-stat-card">
                            <div class="cms-stat-label">CURRENT PAGE</div>
                            <div class="cms-stat-value">${this.currentPage.toUpperCase()}</div>
                        </div>
                        <div class="cms-stat-card">
                            <div class="cms-stat-label">TOTAL PAGES</div>
                            <div class="cms-stat-value">${CMS_SITE_PAGES.length}</div>
                        </div>
                        <div class="cms-stat-card">
                            <div class="cms-stat-label">LAST SAVED</div>
                            <div class="cms-stat-value">${new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div class="cms-quick-actions">
                        <h4>QUICK ACTIONS</h4>
                        <div class="cms-actions-grid">
                            <div class="cms-action-card" onclick="CMS.closeDashboard()">
                                <i class="fa fa-pencil"></i>
                                <span>Live Editor</span>
                                <small>Edit content directly</small>
                            </div>
                            <div class="cms-action-card" onclick="CMS.renderTab('pages')">
                                <i class="fa fa-files-o"></i>
                                <span>Manage Pages</span>
                                <small>Switch between site pages</small>
                            </div>
                            <div class="cms-action-card" onclick="CMS.renderTab('history')">
                                <i class="fa fa-undo"></i>
                                <span>View History</span>
                                <small>Restore previous versions</small>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'pages':
                content.innerHTML = `
                    <div style="margin-bottom: 25px; padding: 15px; background: #fff5f5; border-radius: 8px; border: 1px solid #ffdada; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h5 style="margin: 0; color: #d11f26; font-size: 0.95rem;">Product Solutions</h5>
                            <p style="margin: 5px 0 0 0; font-size: 0.8rem; color: #666;">Manage dynamic product detail pages and solution categories.</p>
                        </div>
                        <button class="cms-btn cms-btn-save" onclick="CMS.renderTab('solutions')">MANAGE SOLUTIONS</button>
                    </div>
                    <ul class="list-group" style="max-height: 50vh; overflow-y: auto;">
                        ${CMS_ALL_PAGES.map(p => `<li class="list-group-item d-flex justify-content-between align-items-center">${p.title} <small class="text-muted">${p.file}</small> <button class="btn btn-sm btn-link" onclick="CMS.openPage('${p.file}')">EDIT</button></li>`).join('\n')}
                    </ul>
                `;
                break;
            case 'history':
                content.innerHTML = `<div class="text-center p-5"><i class="fa fa-spinner fa-spin fa-2x"></i><p class="mt-3 text-muted">Loading timeline...</p></div>`;
                fetch(`/api/v2/history/${this.currentPage}`, {
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        this.loadedHistory = data;
                        if (!data || data.length === 0) {
                            content.innerHTML = this.getEmptyStateHtml('No save history found for this page.');
                            return;
                        }

                        let html = `
                            <div class="cms-history-header">
                                <div>View and restore previous versions of your content.</div>
                                <button class="btn btn-sm btn-link text-danger" onclick="CMS.renderTab('history')"><i class="fa fa-refresh"></i> REFRESH</button>
                            </div>
                            <div class="cms-history-table-wrapper cms-tab-scroll">
                            <table class="cms-history-table">
                                <thead>
                                    <tr>
                                        <th>DATE & TIME</th>
                                        <th>CHANGED BY</th>
                                        <th>CHANGES</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;

                        data.forEach(row => {
                            const d = new Date(row.created_at);
                            const dateStr = d.toLocaleDateString('en-GB');
                            const timeStr = d.toLocaleTimeString('en-GB');

                            html += `
                                <tr>
                                    <td>
                                        <strong>${dateStr}</strong><br>
                                        <span style="color:#888; font-size:0.8rem;">${timeStr}</span>
                                    </td>
                                    <td><span class="badge badge-danger" style="background:#ffecec; color:#d11f26; padding:5px 10px; border-radius:4px;">${row.admins?.username || 'Admin'}</span></td>
                                    <td style="color:#666">${Object.keys(row.snapshot || {}).length}</td>
                                    <td>
                                        <button class="cms-btn-restore" onclick="CMS.restoreSnapshot('${row.id}')">RESTORE</button>
                                    </td>
                                </tr>
                            `;
                        });

                        html += `</tbody></table></div>`;
                        content.innerHTML = html;
                    })
                    .catch(err => {
                        content.innerHTML = this.getEmptyStateHtml('Error loading history timeline.');
                    });
                break;
            case 'hero':
                content.innerHTML = this.renderHeroForm();
                break;
            case 'solutions':
                content.innerHTML = this.renderSolutionsList();
                break;
            case 'apps':
                content.innerHTML = this.renderApplicationsList();
                break;
            case 'applications-config':
                this.renderApplicationsConfigTab();
                break;
            case 'case-studies':
                content.innerHTML = this.renderCaseStudiesList();
                break;
            case 'resources-page':
            case 'resources':
                content.innerHTML = this.renderResourcesPageList();
                break;
            case 'footer':
                content.innerHTML = this.generateSectionForm('footer', 'No Editable Footer elements found.');
                break;
            case 'pages-content':
                content.innerHTML = this.generateSectionForm('body', 'No editable page elements found.');
                break;
            case 'support':
                this.renderSupportTab();
                break;
            case 'locations':
                this.renderLocationsTab();
                break;
            case 'media':
                content.innerHTML = this.getMediaLibraryHtml();
                break;
            default:
                content.innerHTML = `<div class="p-4 text-center">
                    <i class="fa fa-magic fa-3x mb-3 text-muted"></i>
                    <p>Real-time editing for <strong>${tab}</strong> is active directly on the page.</p>
                    <button class="btn btn-outline-danger btn-sm" onclick="CMS.closeDashboard()">Close Dashboard & Start Editing</button>
                </div>`;
        }
    },

    generateSectionForm(selector, emptyMessage) {
        const container = document.querySelector(selector);
        if (!container) return this.getEmptyStateHtml(emptyMessage);

        const elements = container.querySelectorAll('[data-cms]');
        if (elements.length === 0) return this.getEmptyStateHtml('No editable content found in this section block.');

        let html = '<div class="cms-tab-scroll">';

        elements.forEach(el => {
            const id = el.getAttribute('data-cms');

            // -- PROTECTED GLOBAL COMPONENTS (New v3 Logic) --
            // If it's a global logo/footer element and we're not on the homepage, hide it from the sidebar list too
            const isProtectedGlobal = ['site-logo', 'footer-logo', 'client-logo-1', 'client-logo-2', 'client-logo-3', 'client-logo-4', 'client-logo-5', 'client-logo-6'].includes(id);
            const isHomepage = this.currentPage === 'index' || this.currentPage === '';
            if (isProtectedGlobal && !isHomepage) return;

            const bg = window.getComputedStyle(el).backgroundImage;
            const isImage = el.tagName === 'IMG' || (bg !== 'none' && bg.includes('url'));
            const type = isImage ? 'Image' : 'Text';
            const label = el.tagName.toLowerCase();

            html += `
                <div class="cms-form-group">
                    <div class="cms-form-label">${type} Box (${label}) <span>ID: ${id}</span></div>
            `;

            if (isImage) {
                const src = el.tagName === 'IMG' ? el.src : bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
                const parentLink = el.closest('a');
                const linkVal = parentLink ? parentLink.getAttribute('href') : '';

                html += `
                    <div class="cms-media-preview-box">
                        <img src="${src}" class="cms-media-thumb">
                        <div class="cms-media-actions">
                            <label class="cms-image-link-label" style="font-size:0.65rem; color:#999; display:block; margin-bottom:2px;">IMAGE SOURCE</label>
                            <input type="text" class="cms-input" value="${src}" id="input-${id}" onchange="CMS.updateElement('${id}', 'image', this.value)">
                            
                            ${parentLink ? `
                                <label class="cms-image-link-label" style="font-size:0.65rem; color:#999; display:block; margin-top:8px; margin-bottom:2px;">LINK URL</label>
                                <input type="text" class="cms-input cms-image-link-input" value="${linkVal}" placeholder="e.g. contact.html" onchange="CMS.updateElement('${id}-link', 'text', this.value)">
                            ` : ''}
                            
                            <button class="cms-btn cms-btn-preview mt-2 w-100 justify-content-center" onclick="CMS.triggerImagePickerForForm('${id}')"><i class="fa fa-camera"></i> BROWSE MEDIA</button>
                        </div>
                    </div>
                `;
            } else {
                // Ensure no HTML breaking by simplistic encoding
                const val = el.innerHTML.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                html += `<textarea class="cms-textarea" id="input-${id}" onchange="CMS.updateElement('${id}', 'text', this.value)">${val}</textarea>`;
            }
            html += `</div>`;
        });

        html += '</div>';
        return html;
    },

    updateElement(id, type, value) {
        const el = document.querySelector(`[data-cms="${id}"]`);
        if (!el) return;

        // -- PROTECTED FIELDS --
        // Only sol-\d+-title and app-\d+-title are truly unsaveable (they use DB-driven title fields).
        // feat-\d+-title on the index page ARE editable ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â save their plain text + re-apply formatting.
        const HTML_SPAN_PROTECTED = /^app-\d+-title$|^sol-\d+-title$/;
        if (HTML_SPAN_PROTECTED.test(id)) {
            console.log(`[CMS] Skipping save for protected HTML-span field: ${id}`);
            return;
        }

        // Special handling for feat-\d+-title: capture plain text, save it ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â DO NOT touch innerHTML
        // (Formatting is applied on blur in togglePreview to avoid RTL cursor issue during typing)
        if (/^feat-\d+-title$/.test(id)) {
            const plainText = el.innerText.trim();
            this.pendingChanges[id] = { type: 'text', value: plainText, page_slug: this.currentPage };
            return;
        }

        if (type === 'text') {
            // Special: Handle image links (-link suffix)
            if (id.endsWith('-link')) {
                const imgId = id.replace('-link', '');
                const imgEl = document.querySelector(`[data-cms="${imgId}"]`);
                const parentLink = imgEl ? imgEl.closest('a') : document.querySelector(`[data-cms="${id}"]`);
                if (parentLink) {
                    parentLink.href = value;
                }
            }
            // ONLY update the DOM if this isn't the element we are currently typing in!
            else if (el !== document.activeElement && !el.contains(document.activeElement)) {
                // Smart link update to prevent nesting
                if (el.tagName === 'A' && value.trim().toLowerCase().startsWith('<a')) {
                    const t = document.createElement('div'); t.innerHTML = value;
                    const n = t.querySelector('a');
                    if (n) { el.innerHTML = n.innerHTML; el.href = n.href; }
                } else {
                    let formattedValue = value;
                    if (typeof value === 'string') {
                        formattedValue = value.replace(/<sup>\u00AE<\/sup>|<sup>&reg;<\/sup>/gi, '\u00AE')
                                              .replace(/<sup>\u2122<\/sup>|<sup>&trade;<\/sup>/gi, '\u2122')
                                              .replace(/\u00AE|&reg;/gi, '<sup>&reg;</sup>')
                                              .replace(/\u2122|&trade;/gi, '<sup>&trade;</sup>');
                    }
                    el.innerHTML = formattedValue;
                }
            }
        } else {
            if (el.tagName === 'IMG') el.src = value;
            else el.style.backgroundImage = `url(${value})`;
        }

        // -- GLOBAL LOGO SYNC (FOR SAVING) --
        // Ensure any logo/footer edit ALWAYS saves to the 'index' page slug
        let pageSlugToSave = this.currentPage;
        if (['site-logo', 'footer-logo'].includes(id)) {
            pageSlugToSave = 'index';
        }

        this.pendingChanges[id] = { type, value, page_slug: pageSlugToSave };
        // Manual save is now required to see changes reflected across the site.
        // Auto-refresh/auto-save based on timer has been removed per user request.
    },

    /**
     * GLOBAL PASTE LISTENER FOR DASHBOARD TEXTAREAS
     * Ensures that any HTML content pasted into text-only fields (like short descriptions)
     * is automatically flattened to plain text.
     */
    _initPasteListeners() {
        const textareas = ['new-sol-desc', 'new-story-desc', 'new-res-desc'];
        textareas.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('paste', (e) => {
                    e.preventDefault();
                    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
                    // Use execCommand to preserve undo/redo history if possible
                    document.execCommand('insertText', false, text);
                });
            }
        });
    },

    triggerImagePickerForForm(id, previewId = null) {
        let el = document.querySelector(`[data-cms="${id}"]`);
        if (!el) {
            el = document.getElementById(id);
        }
        if (el) {
            this.activeImageElement = el;
            this.activeImagePreviewId = previewId;
            this.openImagePicker();
        }
    },

    getEmptyStateHtml(msg) {
        return `
            <div class="cms-empty-state">
                <i class="fa fa-folder-open-o"></i>
                <p>${msg}</p>
            </div>
        `;
    },

    getMediaLibraryHtml() {
        const images = new Set();
        
        // 0. Recent Uploads from localStorage (First in grid)
        try {
            const recent = JSON.parse(localStorage.getItem('cms_recent_uploads') || '[]');
            recent.forEach(url => { if (url) images.add(url); });
        } catch(e) {}
        
        // 1. Images from current DOM
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.closest('.cms-modal') && !img.src.includes('data:image')) images.add(img.src);
        });
        document.querySelectorAll('*').forEach(el => {
            if (el.closest && el.closest('.cms-modal')) return;
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg !== 'none' && bg.includes('url')) {
                const url = bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
                if (!url.includes('data:image')) images.add(url);
            }
        });

        // 2. Images from CMS state (Solutions, Stories, Resources, Applications)
        if (this.state) {
            if (this.state.solutions) this.state.solutions.forEach(s => { if (s.icon_image_url) images.add(s.icon_image_url); if (s.hero_bg_image_url) images.add(s.hero_bg_image_url); });
            if (this.state.applications) this.state.applications.forEach(a => { if (a.icon_image_url) images.add(a.icon_image_url); if (a.hero_bg_image_url) images.add(a.hero_bg_image_url); });
            if (this.state.stories) this.state.stories.forEach(s => { if (s.hero_image_url) images.add(s.hero_image_url); });
            if (this.state.resources) this.state.resources.forEach(r => { if (r.thumbnail_url) images.add(r.thumbnail_url); if (r.file_url && r.file_url.match(/\\.(jpeg|jpg|gif|png|webp|svg)$/i)) images.add(r.file_url); });
        }

        let html = `
            <div style="margin-bottom: 20px;">
               <button class="cms-btn cms-btn-save w-100 justify-content-center py-3" onclick="CMS.triggerMediaLibraryUpload()">
                   <i class="fa fa-upload"></i> UPLOAD NEW MEDIA TO SERVER
               </button>
               <div style="text-align:center; font-size:0.8rem; color:#888; margin-top:10px;">Note: You can use the buttons directly on the page to swap specific images. Click an image for a preview & download.</div>
            </div>
            <div class="cms-tab-scroll" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
        `;

        if (images.size === 0) {
            html += this.getEmptyStateHtml('No media found on this page or server state.');
        } else {
            images.forEach(src => {
                const absoluteSrc = src.startsWith('http') || src.startsWith('data:') ? src : window.location.origin + (src.startsWith('/') ? '' : '/') + src;
                html += `<img src="${absoluteSrc}" style="width:100%; height:120px; object-fit:cover; border-radius:6px; border:1px solid #ddd; cursor:pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="CMS.showMediaPreview('${absoluteSrc}')">`;
            });
        }
        html += `</div>`;
        return html;
    },

    showMediaPreview(url) {
        let previewModal = document.getElementById('cms-media-preview-modal');
        if (!previewModal) {
            previewModal = document.createElement('div');
            previewModal.id = 'cms-media-preview-modal';
            previewModal.className = 'cms-modal';
            previewModal.style.setProperty('z-index', '3000000', 'important');
            previewModal.style.display = 'none';
            document.body.appendChild(previewModal);
        }
        
        previewModal.innerHTML = `
            <div class="cms-dashboard-container" style="width: 80vw; height: 80vh; max-width: 1000px; flex-direction: column; background: #fff; position: relative;">
                <div class="cms-content-header" style="padding: 15px 20px; border-bottom: 1px solid #eee; margin:0; display:flex; justify-content:space-between; align-items:center;">
                    <h2 style="font-size:1.1rem; margin:0;">Media Preview</h2>
                    <i class="fa fa-times cms-close-btn" style="cursor:pointer;" onclick="document.getElementById('cms-media-preview-modal').style.display='none'"></i>
                </div>
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 20px; background: #f9f9f9; overflow:hidden;">
                    <img src="${url}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:4px; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
                </div>
                <div style="padding: 15px 20px; border-top: 1px solid #eee; background: #fff; display:flex; justify-content:center; align-items:center;">
                    <a href="${url}" download target="_blank" class="cms-btn cms-btn-save" style="text-decoration:none; display:inline-block; padding: 8px 20px;">
                        <i class="fa fa-download" style="margin-right:5px;"></i> DOWNLOAD
                    </a>
                </div>
            </div>
        `;
        previewModal.style.display = 'flex';
    },

    renderHeroForm() {
        const sub = document.querySelector('[data-cms="hero-sub-1"]')?.innerHTML || '';
        const title = document.querySelector('[data-cms="hero-title"]')?.innerHTML || document.querySelector('[data-cms="case-studies-hero-title"]')?.innerHTML || '';
        const desc = document.querySelector('[data-cms="hero-desc"]')?.innerHTML || '';
        
        let bgKey = 'hero-bg-1';
        let bgEl = document.querySelector('[data-cms="hero-bg-1"]');
        if (!bgEl) {
            bgEl = document.querySelector('[data-cms="ref-hero-bg-1"]');
            if (bgEl) bgKey = 'ref-hero-bg-1';
        }
        
        const bgImg = bgEl?.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1') || '';

        return `
            <div class="cms-tab-scroll">
                <h3>HERO</h3>
                <hr>
                <div class="cms-form-group">
                    <div class="cms-module-title">SUBTITLE</div>
                    <input type="text" class="cms-input" value="${sub}" oninput="CMS.updateElement('hero-sub-1', 'text', this.value)">
                </div>
                <div class="cms-form-group">
                    <div class="cms-module-title">MAIN TITLE</div>
                    <input type="text" class="cms-input" value="${title}" oninput="CMS.updateElement('${bgKey === 'ref-hero-bg-1' ? 'case-studies-hero-title' : 'hero-title'}', 'text', this.value)">
                </div>
                <div class="cms-form-group">
                    <div class="cms-module-title">DESCRIPTION</div>
                    <textarea class="cms-textarea" oninput="CMS.updateElement('hero-desc', 'text', this.value)">${desc}</textarea>
                </div>
                <div class="cms-form-group">
                    <div class="cms-module-title">HERO BACKGROUND</div>
                    <div class="cms-hero-bg-preview" style="background-image: url(${bgImg})"></div>
                    <button class="cms-btn cms-btn-save" onclick="CMS.triggerImagePickerForForm('${bgKey}')">CHANGE IMAGE</button>
                </div>
            </div>
        `;
    },

    renderSolutionsList() {
        return `
            <div class="cms-tab-scroll">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <p class="text-muted m-0">Add or edit dynamic solutions. Each solution generates a dedicated inner page.</p>
                    <button class="cms-add-btn" onclick="CMS.showAddSolutionForm()"><i class="fa fa-plus"></i> ADD SOLUTION</button>
                </div>

                <!-- ADD / EDIT FORM (hidden by default) -->
                ${this.renderSolutionFormHtml()}

                <!-- EXISTING SOLUTIONS LIST -->
                <div style="font-size:0.75rem; font-weight:800; color:#999; text-transform:uppercase; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:5px;">Existing Products & Solutions</div>
                <div class="cms-solutions-list-wrapper">
                    ${this.renderSolutionsListWithData(this.state.solutions || [])}
                </div>
            </div>
        `;
    },

    renderSolutionFormHtml() {
        let categoryGroupsHtml = '';
        for (const [groupName, categories] of Object.entries(CMS_SOL_GROUPS)) {
            categoryGroupsHtml += `
            <div style="margin-bottom:15px; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
                <div style="font-size:0.65rem; font-weight:800; color:#d11f26; text-transform:uppercase; margin-bottom:5px;">${groupName}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:5px;">
                    ${categories.map(c => `
                        <label style="font-size:0.7rem; font-weight:500; display:flex; align-items:center; gap:5px; margin:0; cursor:pointer; line-height:1.2;">
                            <input type="checkbox" name="sol-cat" value="${c}"> ${c}
                        </label>
                    `).join('')}
                </div>
            </div>`;
        }

        const productFamilies = ['GeoGrid', 'FabGrid', 'GeoCell', 'FPS', 'BallastGuard', 'Marine'];

        return `
            <div id="cms-solution-form" style="display:none; background:#f0f7ff; border:1px solid #cce5ff; border-radius:10px; padding:25px; margin-bottom:30px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                <h5 id="sol-form-title" style="font-size:0.9rem; font-weight:800; text-transform:uppercase; color:#0056b3; margin-bottom:20px; border-bottom: 2px solid #0056b3; padding-bottom: 8px;"><i class="fa fa-lightbulb-o"></i> NEW SOLUTION</h5>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    <div>
                        <div style="display:grid; grid-template-columns: 1fr 100px; gap:15px; margin-bottom: 15px;">
                            <div class="cms-form-group">
                                <label style="font-size:0.75rem; font-weight:700; color:#555; text-transform:uppercase;">Solution Title</label>
                                <input type="text" id="new-sol-title" class="cms-input mt-1" placeholder="e.g. Soil Stabilization">
                            </div>
                            <div class="cms-form-group">
                                <label style="font-size:0.75rem; font-weight:700; color:#555; text-transform:uppercase;">Order</label>
                                <input type="number" id="new-sol-order" class="cms-input mt-1" value="0" title="Manual sorting order (smaller numbers appear first)">
                            </div>
                        </div>
                        <div class="cms-form-group mb-3">
                            <label style="font-size:0.75rem; font-weight:700; color:#555; text-transform:uppercase;">Icon Image</label>
                            <div style="display:flex; gap:8px;">
                                <input type="text" id="new-sol-img" class="cms-input mt-1" placeholder="images/solutions/my-icon.png">
                                <button class="cms-btn cms-btn-save mt-1" style="flex-shrink:0; background:#007bff; width: 42px; padding: 0;" onclick="CMS.triggerFileUploadForId('new-sol-img')" title="Upload Image"><i class="fa fa-camera"></i></button>
                            </div>
                        </div>
                        <div class="cms-form-group mb-3">
                            <label style="font-size:0.75rem; font-weight:700; color:#555; text-transform:uppercase;">Product Category (Auto-Fetch Resources)</label>
                            <select id="new-sol-product-family" class="cms-input mt-1" style="height:42px;">
                                <option value="">-- Generic Solution --</option>
                                ${productFamilies.map(p => `<option value="${p}">${p}</option>`).join('')}
                            </select>
                        </div>
                        <div class="cms-form-group mb-3">
                            <label style="font-size:0.75rem; font-weight:700; color:#555; text-transform:uppercase;">Brief Description</label>
                            <textarea id="new-sol-desc" class="cms-textarea mt-1" style="min-height:90px;" placeholder="Brief description of the solution..."></textarea>
                        </div>
                        <div class="cms-form-group">
                            <label style="font-size:0.75rem; font-weight:700; color:#555; text-transform:uppercase;">Custom Page Filename</label>
                            <input type="text" id="new-sol-link" class="cms-input mt-1" placeholder="e.g. solution-load-support.html">
                        </div>
                    </div>
                    <div>
                        <label style="font-size:0.75rem; font-weight:700; color:#555; text-transform:uppercase;">Applications (Select Multiple)</label>
                        <div id="new-sol-category-list" style="max-height:430px; overflow-y:auto; background:#fff; border:1px solid #ced4da; border-radius:6px; padding:15px; margin-top: 5px;">
                            ${categoryGroupsHtml}
                        </div>
                    </div>
                </div>

                <div style="display:flex; gap:12px; margin-top:25px; border-top: 1px solid #cee; padding-top: 20px;">
                    <button class="cms-btn cms-btn-save" id="btn-save-sol" onclick="CMS.saveSolutionMetadata(true)" style="background:#d11f26; padding: 12px 25px;"><i class="fa fa-save"></i> SAVE & GENERATE PAGE</button>
                    <button class="cms-btn cms-btn-save" id="btn-save-sol-data" style="background:#333; padding: 12px 25px;" onclick="CMS.saveSolutionMetadata(false)"><i class="fa fa-check"></i> SAVE DATA ONLY</button>
                    <button class="cms-btn cms-btn-reset" onclick="document.getElementById('cms-solution-form').style.display='none'" style="padding: 12px 25px;">CANCEL</button>
                </div>
            </div>
        `;
    },

    renderSolutionsListWithData(items) {
        let html = '';
        if (items.length === 0) {
            html += this.getEmptyStateHtml('No solutions found. Click "Add Solution" to create your first product entry.');
        } else {
            items.forEach((item, index) => {
                const title = item.title || 'NEW SOLUTION';
                const rawDesc = item.short_description || item.description || '';
                const desc = this.stripHtml(rawDesc);
                const dbId = item.id || '';
                const elId = `sol-${dbId}-title`;

                html += `
                    <div class="cms-module-card" data-sol-id="${dbId}">
                        <div class="number-badge">${index + 1}</div>
                        <div style="width:60px; height:40px; border-radius:4px; overflow:hidden; flex-shrink:0; background:#eee; margin-right:15px;">
                            <img src="${item.icon_image_url || ''}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://picsum.photos/seed/${dbId}/100/100'">
                        </div>
                        <div style="flex-grow:1">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                                 ${item.slug ? `<a href="solution-${item.slug}.html" target="_blank" style="font-size:0.65rem; color:#d11f26; text-decoration:none; font-weight:800; text-transform:uppercase;"><i class="fa fa-external-link"></i> View Page</a>` : ''}
                                 ${item.slug ? `<button style="background:#fff2f2; color:#d11f26; border:1px solid #d11f26; font-size:0.6rem; font-weight:800; padding:2px 6px; border-radius:4px; cursor:pointer;" onclick="CMS.openPage('solution-${item.slug}.html')">EDIT INTERIOR</button>` : ''}
                            </div>
                            <div class="cms-module-title" style="color:#d11f26" contenteditable="true" onblur="CMS.updateElement('sol-${dbId}-title', 'text', this.innerText.replace(/\\n/g, '').trim())">${title}</div>
                            <p style="font-size:0.85rem; color:#666; margin:0; line-height:1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word;" title="${desc.replace(/"/g, '&quot;')}">
                                ${desc.split(' ').length > 16 ? desc.split(' ').slice(0, 16).join(' ') + '...' : (desc.length > 80 ? desc.substring(0, 80) + '...' : desc)}
                            </p>
                        </div>
                        <div class="cms-card-actions">
                            <i class="fa fa-pencil" style="color:#007bff; cursor:pointer;" onclick="CMS.editSolution('${dbId}')" title="Edit Solution"></i>
                            <i class="fa fa-caret-up" onclick="CMS.moveElement('sol-${dbId}-title', 'up')"></i>
                            <i class="fa fa-caret-down" onclick="CMS.moveElement('sol-${dbId}-title', 'down')"></i>
                            <i class="fa fa-trash-o" style="color:#ff4d4d; cursor:pointer;" onclick="CMS.deleteElement('sol-${dbId}-title', 'solutions', '${dbId}')" title="Delete Solution"></i>
                        </div>
                    </div>
                `;
            });
        }
        html += `</div>`;
        return html;
    },

    renderApplicationsList() {
        let html = `
            <div class="cms-tab-scroll">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <p class="text-muted m-0">Manage your application categories.</p>
                    <button class="cms-add-btn" onclick="CMS.showAddAppForm()"><i class="fa fa-plus"></i> ADD APPLICATION</button>
                </div>

                <!-- ADD / EDIT FORM (hidden by default) -->
                <div id="cms-application-form" style="display:none; background:#f0fff4; border:1px solid #c6f6d5; border-radius:10px; padding:20px; margin-bottom:25px;">
                    <h5 id="app-form-title" style="font-size:0.85rem; font-weight:800; text-transform:uppercase; color:#276749; margin-bottom:15px;"><i class="fa fa-th-large"></i> NEW APPLICATION</h5>
                    <div style="margin-top:12px;">
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Application Title</label>
                        <input type="text" id="new-app-title" class="cms-input mt-1" placeholder="e.g. Roadways">
                    </div>
                    <div style="display:flex; gap:10px; margin-top:15px;">
                        <button class="cms-btn cms-btn-save" id="btn-save-app" onclick="CMS.saveApplicationMetadata()"><i class="fa fa-save"></i> SAVE APPLICATION</button>
                        <button class="cms-btn cms-btn-reset" onclick="document.getElementById('cms-application-form').style.display='none'">CANCEL</button>
                    </div>
                </div>
                <div class="cms-apps-list-wrapper">
        `;

        const items = (this.state.applications && this.state.applications.length > 0)
            ? this.state.applications
            : Array.from(document.querySelectorAll('[data-cms^="app-"][data-cms$="-title"]:not(.slick-cloned)')).map(el => {
                return {
                    id: el.closest('[data-app-id]')?.getAttribute('data-app-id'),
                    title: el.innerText,
                    element_id: el.getAttribute('data-cms')
                };
            });

        items.forEach((item, index) => {
            const title = item.title || 'NEW APPLICATION';
            const dbId = item.id || '';
            const elId = item.element_id || `app-${index + 1}-title`;

            html += `
                <div class="cms-module-card" data-app-db-id="${dbId}">
                    <div class="number-badge">${index + 1}</div>
                    <div style="font-weight:700; color:#333; flex-grow:1" contenteditable="true" onblur="CMS.updateElement('${elId}', 'text', this.innerText)">${title}</div>
                    <div class="cms-card-actions">
                        <i class="fa fa-pencil" style="color:#007bff; cursor:pointer;" onclick="CMS.editApplication('${dbId}')" title="Edit Application"></i>
                        <i class="fa fa-caret-up" onclick="CMS.moveElement('${elId}', 'up')"></i>
                        <i class="fa fa-caret-down" onclick="CMS.moveElement('${elId}', 'down')"></i>
                        <i class="fa fa-trash-o" style="color:#ff4d4d; cursor:pointer;" onclick="CMS.deleteElement('${elId}', 'apps', '${dbId}')" title="Delete Application"></i>
                    </div>
                </div>
            `;
        });
        html += `</div></div>`;
        return html;
    },

    /* ===========================
       Project Highlights MANAGEMENT
       =========================== */
    renderCaseStudiesList() {
        // Build product options using only the CORE Products (Static 6)
        // User requested to remove dynamic solutions from this filter to match the homepage.
        const coreProductOptions = CMS_PRODUCTS.map(p => `<option value="${p.value}">${p.label}</option>`).join('');
        
        let productOptions = `<option value="">-- No Specific Product --</option>${coreProductOptions}`;
        const storyFiles = CMS_ALL_PAGES.filter(p => p.file.startsWith('case-study-'));

        let html = `<div class="cms-tab-scroll">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <p class="text-muted m-0" style="font-size:0.9rem;">Add or edit Project Highlights. Each story is linked to a product so the filter works correctly.</p>
                <button class="cms-add-btn" onclick="CMS.showAddStoryForm()"><i class="fa fa-plus"></i> ADD STORY</button>
            </div>

            <!-- ADD / EDIT FORM (hidden by default) -->
            <div id="cms-story-form" style="display:none; background:#fff5f5; border:1px solid #ffe0e0; border-radius:10px; padding:20px; margin-bottom:25px;">
                <h5 id="story-form-title" style="font-size:0.85rem; font-weight:800; text-transform:uppercase; color:#d11f26; margin-bottom:15px;"><i class="fa fa-star"></i> NEW CASE STUDY</h5>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                    <div>
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Story Title</label>
                        <input type="text" id="new-story-title" class="cms-input mt-1" placeholder="e.g. Highway Stabilization Project">
                    </div>
                    <div>
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Product (for filter)</label>
                        <select id="new-story-product" class="cms-input mt-1" style="height:42px;">
                            ${productOptions}
                        </select>
                    </div>
                </div>
                <div style="margin-top:12px;">
                    <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Short Description</label>
                    <textarea id="new-story-desc" class="cms-textarea mt-1" style="min-height:70px;" placeholder="Brief description of the case study..."></textarea>
                </div>
                <div style="margin-top:12px;">
                    <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Story Image</label>
                    <div style="display:flex; gap:8px;">
                        <input type="text" id="new-story-img" data-cms="new-story-img" class="cms-input mt-1" placeholder="URL or upload...">
                        <button class="cms-btn cms-btn-save mt-1" style="flex-shrink:0;" onclick="CMS.triggerFileUploadForId('new-story-img')"><i class="fa fa-camera"></i></button>
                    </div>
                </div>
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <button id="btn-save-story" class="cms-btn cms-btn-save" onclick="CMS.saveNewStory()"><i class="fa fa-save"></i> SAVE & CREATE PAGE</button>
                    <button class="cms-btn cms-btn-reset" onclick="document.getElementById('cms-story-form').style.display='none'">CANCEL</button>
                </div>
            </div>

            <!-- EXISTING STORIES LIST -->
            <div style="font-size:0.7rem; font-weight:800; color:#999; text-transform:uppercase; margin-bottom:10px;">Existing Stories</div>`;

        // Read from V2 State instead of DOM if possible (more reliable)
        const items = this.state.stories && this.state.stories.length > 0 ? this.state.stories : Array.from(document.querySelectorAll('.product-item[data-category]'));

        if (items.length > 0) {
            items.forEach((item, i) => {
                let cat, link, title, desc, img, id, titleId, descId, imgId;

                if (item.id) { // From state
                    id = item.id;
                    const matchingSolution = this.state.solutions.find(s => s.id === item.related_solution_id);
                    cat = this.stripHtml(matchingSolution ? matchingSolution.title : (CMS_PRODUCTS.find(p => p.value === item.related_solution_id)?.label || item.related_solution_id || 'General'));
                    link = `case-study-${item.slug}.html`;
                    title = this.stripHtml(item.title || '');
                    const rawDesc = item.challenge_text || item.description || '';
                    const cleanDesc = this.stripHtml(rawDesc);
                    desc = cleanDesc.length > 80 ? cleanDesc.substring(0, 80) + '...' : cleanDesc;
                    img = item.hero_image_url;
                    imgId = `story-${i}-img`;
                    titleId = `story-${i}-title`;
                    descId = `story-${i}-desc`;
                    id = item.id; // Ensure ID is used
                } else { // From DOM
                    cat = item.getAttribute('data-category');
                    link = item.querySelector('a')?.getAttribute('href') || '#';
                    title = item.querySelector('h6')?.innerText || 'Untitled Story';
                    desc = item.querySelector('p')?.innerText || '';
                    img = item.querySelector('img')?.src || '';
                    id = item.getAttribute('data-story-id') || `dom-story-${i}`;
                    imgId = `new-story-img`; // Align with editStory form field ID
                    titleId = `story-${i + 1}-title`;
                    descId = `story-${i + 1}-desc`;
                }

                const pickerTargetId = (this.currentEditId === id) ? 'new-story-img' : imgId;

                html += `<div class="cms-module-card" style="margin-bottom:12px;" data-story-id="${id || ''}">
                        <div style="width:80px; height:55px; border-radius:6px; overflow:hidden; flex-shrink:0; position:relative; background:#eee;">
                            <img src="${img}" style="width:100%;height:100%;object-fit:cover;">
                            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.4);color:white;font-size:0.55rem;font-weight:800;cursor:pointer;" onclick="CMS.triggerImagePickerForForm('${pickerTargetId}')">CHANGE</div>
                        </div>
                        <div style="flex-grow:1;">
                            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                                <span style="background:#d11f26;color:#fff;font-size:0.6rem;font-weight:800;padding:2px 8px;border-radius:20px;text-transform:uppercase;">${cat}</span>
                                <a href="${link}" target="_blank" style="font-size:0.7rem;color:#aaa;"><i class="fa fa-external-link"></i> View Page</a>
                            </div>
                            <div style="font-weight:800;color:#222;font-size:0.9rem;margin-bottom:3px;" ${titleId ? `contenteditable="true" onblur="CMS.updateElement('${titleId}','text',this.innerText)"` : ''}>${title}</div>
                            <div style="font-size:0.8rem;color:#777; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word;" title="${desc.replace(/"/g, '&quot;')}">
                                ${desc.split(' ').length > 16 ? desc.split(' ').slice(0, 16).join(' ') + '...' : (desc.length > 80 ? desc.substring(0, 80) + '...' : desc)}
                            </div>
                        </div>
                        <div class="cms-card-actions">
                            <i class="fa fa-pencil" style="color:#007bff; cursor:pointer;" onclick="CMS.editStory('${id || ''}')" title="Edit Story Details"></i>
                            <i class="fa fa-trash-o" style="color:#ff4d4d; cursor:pointer;" onclick="CMS.deleteElement('${titleId || 'story-' + i + '-title'}', 'case-studies', '${id || ''}')" title="Delete Story"></i>
                        </div>
                    </div>`;
            });
        } else {
            // Not on case-studies.html ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â show the story page list from config
            storyFiles.forEach(p => {
                const product = CMS_PRODUCTS.find(pr => p.file.toLowerCase().includes(pr.value.toLowerCase()));
                const catLabel = product ? product.label : 'Unknown';
                html += `<div class="cms-module-card">
                    <div style="flex-grow:1;">
                        <span style="background:#d11f26;color:#fff;font-size:0.6rem;font-weight:800;padding:2px 8px;border-radius:20px;">${catLabel}</span>
                        <div style="font-weight:700;margin-top:5px;">${p.title}</div>
                        <div style="font-size:0.75rem;color:#aaa;">${p.file}</div>
                    </div>
                    <div class="cms-card-actions">
                        <button class="cms-btn cms-btn-preview" style="font-size:0.75rem; font-weight:700;" onclick="CMS.openPage('${p.file}')">OPEN &amp; EDIT</button>
                    </div>
                </div>`;
            });
        }

        html += `</div>`;
        return html;
    },

    showAddStoryForm() {
        this.currentEditId = null;
        const form = document.getElementById('cms-story-form');
        if (form) {
            form.style.display = 'block';
            const titleEl = document.getElementById('story-form-title');
            if (titleEl) titleEl.innerHTML = '<i class="fa fa-star"></i> NEW CASE STUDY';

            const saveBtn = document.getElementById('btn-save-story');
            if (saveBtn) saveBtn.innerHTML = '<i class="fa fa-save"></i> SAVE & CREATE PAGE';

            document.getElementById('new-story-title').value = "";
            document.getElementById('new-story-desc').value = "";
            document.getElementById('new-story-img').value = "";
            form.scrollIntoView({ behavior: 'smooth' });
        }
    },

    editStory(id) {
        console.log(`[CMS] editStory called with ID: ${id}`);
        this.currentEditId = id;

        // Try finding by ID (UUID) first, then by slug
        let story = this.state.stories.find(s => s.id === id);
        if (!story && id) {
            story = this.state.stories.find(s => s.slug === id);
            console.log(`[CMS] Story not found by UUID, checked slug. Found: ${!!story}`);
        }
        const form = document.getElementById('cms-story-form');
        if (form && story) {
            form.style.display = 'block';
            const titleEl = document.getElementById('story-form-title');
            if (titleEl) titleEl.innerHTML = '<i class="fa fa-pencil"></i> EDIT CASE STUDY';

            const saveBtn = document.getElementById('btn-save-story');
            if (saveBtn) saveBtn.innerHTML = '<i class="fa fa-save"></i> UPDATE STORY';

            document.getElementById('new-story-title').value = story.title || "";
            // Prioritize products_used for the dropdown selection
            document.getElementById('new-story-product').value = story.products_used || story.related_solution_id || "";
            document.getElementById('new-story-desc').value = this.stripHtml(story.description || story.challenge_text || "");
            document.getElementById('new-story-img').value = story.hero_image_url || "";
            console.log(`[CMS] Editing case study: ${id}`);
            form.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`[CMS] Story not found for ID: ${id}. Ensure this.state.stories is loaded.`);
        }
    },

    async saveNewStory() {
        const title = document.getElementById('new-story-title')?.value?.trim();
        const productInput = document.getElementById('new-story-product')?.value;
        const desc = document.getElementById('new-story-desc')?.value?.trim();
        const img = document.getElementById('new-story-img')?.value?.trim() || "";

        if (!title) { await this.showAlert('Missing Title', 'Please enter a story title.'); return; }

        const isUpdate = !!this.currentEditId;
        const storyId = this.currentEditId;
        
        let slug;
        if (isUpdate) {
            const originalStory = this.state.stories.find(s => s.id === storyId);
            slug = originalStory?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        } else {
            slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }
        const pageFilename = `case-study-${slug}.html`;

        // Ensure we send a valid UUID or null
        let solutionId = productInput;
        if (!solutionId || solutionId.length < 30) { // Simple UUID check
            solutionId = null;
        }

        console.log(`[CMS] Saving story... isUpdate: ${isUpdate}, Title: ${title}, SolID: ${solutionId}`);

        try {
            this.isSaving = true; // Set flag to allow reload without browser warning
            const url = isUpdate ? `/api/v2/stories/${storyId}` : `/api/v2/stories`;
            const method = isUpdate ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    slug: slug,
                    title,
                    related_solution_id: solutionId,
                    products_used: productInput || "",
                    hero_image_url: img,
                    challenge_text: desc,
                    description: desc,
                    is_active: true,
                    is_deleted: false,
                    published_date: (isUpdate && storyId.length > 20) ? undefined : new Date().toISOString(),
                    location: 'Baton Rouge, LA',
                    application: 'Soil Reinforcement',
                    project_benefits: 'Efficiency & Cost Savings'
                })
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('[CMS] Save failed:', data);
                await this.showAlert('Save Error', `Status: ${res.status}\nMessage: ${data.message || data.error || 'Check console for details.'}`);
                return;
            }

            // SUCCESS!
            this.currentEditId = null;
            document.getElementById('cms-story-form').style.display = 'none';
            
            const actionMsg = isUpdate ? 'updated' : 'created and dynamic page generated';
            const alertTitle = isUpdate ? 'Story Updated' : 'Case Study Created';
            const bodyMsg = isUpdate 
                ? `Case study has been updated.\n\nFilename: ${pageFilename}\n\nWould you like to open the updated page now to continue editing?`
                : `Case study has been created and dynamic page generated.\n\nFilename: ${pageFilename}\n\nWould you like to open the new page now to edit its content?`;
            
            await this.showConfirm(alertTitle, bodyMsg, 'OPEN PAGE', 'CLOSE')
            .then(shouldOpen => {
                if (shouldOpen) {
                    window.location.href = `${pageFilename}?cms_dashboard=true&cms_tab=${this.activeTab || 'case-studies'}`;
                } else {
                    this.refreshWithState();
                }
            });

        } catch (e) {
            console.error('[CMS] Network/Parse Error:', e);
            await this.showAlert('Runtime Error', 'Failed to communicate with CMS backend.');
        }
    },

    /* ===========================
       RESOURCES PAGE MANAGEMENT
       =========================== */
    renderResourcesPageList() {
        const productOptions = CMS_PRODUCTS.map(p => `<option value="${p.value}">${p.label}</option>`).join('');

        // Determine button label based on active category
        let addLabel = 'RESOURCE';
        if (this.activeResCategory === 'pane-blog') addLabel = 'ARTICLE';
        else if (this.activeResCategory === 'pane-videos') addLabel = 'VIDEO';
        else if (this.activeResCategory === 'pane-events') addLabel = 'NOTES';
        else if (this.activeResCategory === 'pane-docs') addLabel = 'DATASHEET';

        let html = `
            <div class="cms-tab-scroll" style="padding: 10px 5px;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:25px; background: #ffffff; padding: 15px 20px; border-radius: 10px; border: 1px solid #e0e0e0; box-shadow: 0 4px 10px rgba(0,0,0,0.05); min-height: 80px;">
                    <div style="display:flex; flex-direction: column; gap: 4px;">
                        <div style="font-size: 0.75rem; font-weight: 800; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Current Category</div>
                        <div style="font-size: 1.1rem; font-weight: 800; color: #d11f26; text-transform: uppercase;">${this.activeResCategory.replace('pane-', '').replace('docs', 'Datasheets').replace('events', 'Technical Notes')}</div>
                    </div>
                    <button class="cms-btn cms-btn-save" style="background:#d11f26; padding: 12px 25px; font-weight: 800; font-size: 0.9rem; border-radius: 6px; flex-shrink: 0; box-shadow: 0 4px 10px rgba(209, 31, 38, 0.2);" onclick="CMS.showAddResourceForm()"><i class="fa fa-plus"></i> ADD ${addLabel}</button>
                </div>
                
                <p style="font-size: 0.8rem; color: #777; margin-bottom: 12px; margin-left: 5px; font-weight: 500;">Switch between categories to manage different types of content:</p>
                <div class="cms-resource-submenu" style="display:flex; gap:12px; overflow-x:auto; padding: 5px 5px 15px 5px; margin-bottom:25px; min-height: 60px;">
                <button class="cms-pill ${this.activeResCategory === 'pane-downloads' ? 'active' : ''}" onclick="CMS.setResourceCategory('pane-downloads')">DOWNLOADS</button>
                <button class="cms-pill ${this.activeResCategory === 'pane-docs' ? 'active' : ''}" onclick="CMS.setResourceCategory('pane-docs')">TECHNICAL DATASHEETS</button>
                <button class="cms-pill ${this.activeResCategory === 'pane-webinar' ? 'active' : ''}" onclick="CMS.setResourceCategory('pane-webinar')">WEBINARS</button>
                <button class="cms-pill ${this.activeResCategory === 'pane-videos' ? 'active' : ''}" onclick="CMS.setResourceCategory('pane-videos')">VIDEOS</button>
                <button class="cms-pill ${this.activeResCategory === 'pane-blog' ? 'active' : ''}" onclick="CMS.setResourceCategory('pane-blog')">BLOG POSTS</button>
                <button class="cms-pill ${this.activeResCategory === 'pane-events' ? 'active' : ''}" onclick="CMS.setResourceCategory('pane-events')">TECHNICAL NOTES</button>
            </div>

            <div id="cms-resource-form" class="cms-form-group" style="display:none; margin-bottom:25px; background:#f0f7ff; border:1px solid #cce5ff;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px; color:#004085;">
                    <i class="fa fa-file-text fa-lg"></i>
                    <h4 style="margin:0; font-size:1rem; font-weight:800; text-transform:uppercase;">New ${this.activeResCategory.replace('pane-', '')} Resource</h4>
                </div>
                <div style="display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:15px;">
                    <div>
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Resource Title</label>
                        <input type="text" id="new-res-title" class="cms-input mt-1" placeholder="e.g. Technical Data Sheet - GeoGrid">
                    </div>
                    <div>
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Product (Filter)</label>
                        <select id="new-res-product" class="cms-input mt-1" style="height:42px;" onchange="CMS.applyResourceDefaultThumb()">
                            ${productOptions}
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Category (Tab)</label>
                        <select id="new-res-tab" class="cms-input mt-1" style="height:42px;" onchange="CMS.applyResourceDefaultThumb()">
                            <option value="pane-downloads" ${this.activeResCategory === 'pane-downloads' ? 'selected' : ''}>DOWNLOADS</option>
                            <option value="pane-docs" ${this.activeResCategory === 'pane-docs' ? 'selected' : ''}>TECHNICAL DATASHEETS</option>
                            <option value="pane-webinar" ${this.activeResCategory === 'pane-webinar' ? 'selected' : ''}>WEBINARS</option>
                            <option value="pane-videos" ${this.activeResCategory === 'pane-videos' ? 'selected' : ''}>VIDEOS</option>
                            <option value="pane-blog" ${this.activeResCategory === 'pane-blog' ? 'selected' : ''}>BLOG POSTS</option>
                            <option value="pane-events" ${this.activeResCategory === 'pane-events' ? 'selected' : ''}>TECHNICAL NOTES</option>
                        </select>
                    </div>
                </div>
                <div style="margin-top:12px;">
                    <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Description</label>
                    <textarea id="new-res-desc" class="cms-textarea mt-1" style="min-height:70px;" placeholder="Brief description of this resource..."></textarea>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">Thumbnail Image</label>
                        <div style="display:flex; gap:8px;">
                            <input type="text" id="new-res-img" class="cms-input mt-1" placeholder="URL or upload...">
                            <button class="cms-btn cms-btn-save mt-1" style="flex-shrink:0; background:#007bff;" onclick="CMS.triggerFileUploadForId('new-res-img')"><i class="fa fa-upload"></i></button>
                        </div>
                    </div>
                    ${(this.activeResCategory === 'pane-blog' || this.activeResCategory === 'pane-webinar') ? '' : `
                    <div>
                        <label style="font-size:0.7rem; font-weight:700; color:#999; text-transform:uppercase;">
                            ${this.activeResCategory === 'pane-videos' ? 'YouTube Video Link / ID' : 'File Link (PDF/Zip)'}
                        </label>
                        <div style="display:flex; gap:8px;">
                            <input type="text" id="new-res-link" class="cms-input mt-1" placeholder="${this.activeResCategory === 'pane-videos' ? 'Paste YouTube URL...' : 'URL or upload...'}">
                            ${this.activeResCategory === 'pane-videos' ? '' : `
                            <button class="cms-btn cms-btn-save mt-1" style="flex-shrink:0; background:#007bff;" onclick="CMS.triggerFileUploadForId('new-res-link', 'pdf')"><i class="fa fa-upload"></i></button>
                            `}
                        </div>
                    </div>
                    `}
                </div>
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <button class="cms-btn cms-btn-save" onclick="CMS.saveNewResource()"><i class="fa fa-save"></i> SAVE RESOURCE</button>
                    <button class="cms-btn cms-btn-reset" onclick="document.getElementById('cms-resource-form').style.display='none'">CANCEL</button>
                </div>
            </div>

            <!-- EXISTING RESOURCES LIST -->
            <div style="display:flex; align-items:center; justify-content:space-between; margin: 20px 0 15px 0; border-bottom: 2px solid #eee; padding-bottom: 8px;">
                <div style="font-size:0.85rem; font-weight:800; color:#444; text-transform:uppercase;">
                    ${this.activeResCategory.replace('pane-', '').replace('docs', 'Technical Datasheets').replace('events', 'Technical Notes')} CONTENT
                </div>
                <select onchange="CMS.setResProductFilter(this.value)" style="font-size:0.75rem; font-weight:700; padding:4px 10px; border:1px solid #ddd; border-radius:5px; color:#444; background:#fafafa; cursor:pointer; width:160px; flex-shrink:0;">
                    <option value="">All Products</option>
                    ${CMS_PRODUCTS.map(p => `<option value="${p.value}" ${this.activeResProductFilter === p.value ? 'selected' : ''}>${p.label}</option>`).join('')}
                </select>
            </div>
                ${this.renderResourcesPageItems(this.activeResCategory.replace('pane-', 'grid-'))}
            </div>`;
        return html;
    },

    renderResourcesPageItems(gridId) {
        let html = '';
        const paneId = gridId.replace('grid-', 'pane-');

        // 1. Try to render from this.state.resources (Relational)
        if (this.state.resources && this.state.resources.length > 0) {
            let items = this.state.resources.filter(r => r.document_type === paneId);
            if (this.activeResProductFilter) {
                items = items.filter(r => (r.category || '').toLowerCase() === this.activeResProductFilter.toLowerCase());
            }
            if (items.length > 0) {
                items.forEach((res) => {
                    const dbId = res.id;
                    const cat = res.category || 'General';
                    const link = res.file_url || '#';
                    const title = res.title || 'Untitled Resource';
                    const desc = res.description || '';
                    const img = res.thumbnail_url || '';

                    html += `<div class="cms-module-card" style="margin-bottom:12px;" data-res-id="${dbId}">
                        <div style="width:80px; height:55px; border-radius:6px; overflow:hidden; flex-shrink:0; position:relative; background:#eee;">
                            ${img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><i class="fa fa-file-pdf-o fa-2x" style="color:#ccc;"></i></div>'}
                        </div>
                        <div style="flex-grow:1;">
                            <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px;">
                                <span style="background:#1a5fa8;color:#fff;font-size:0.6rem;font-weight:800;padding:2px 8px;border-radius:20px;text-transform:uppercase;">${cat}</span>
                                ${link !== '#' ? `<a href="${link}" target="_blank" style="font-size:0.7rem;color:#aaa;text-decoration:none;"><i class="fa fa-external-link"></i> View Page</a>` : ''}
                                ${(link.startsWith('blog-') || link.startsWith('webinar-')) ? `<button style="background:#fff2f2; color:#d11f26; border:1px solid #d11f26; font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:4px; cursor:pointer;" onclick="CMS.openPage('${link}')">EDIT INTERIOR CONTENT</button>` : ''}
                            </div>
                            <div style="font-weight:800;color:#222;font-size:0.9rem;margin-bottom:3px;" contenteditable="true" onblur="CMS.updateElement('res-${dbId}-title', 'text', this.innerText)">${title}</div>
                            <div style="font-size:0.8rem;color:#777; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word;" title="${desc.replace(/"/g, '&quot;')}">
                                ${desc.split(' ').length > 16 ? desc.split(' ').slice(0, 16).join(' ') + '...' : (desc.length > 80 ? desc.substring(0, 80) + '...' : desc)}
                            </div>
                        </div>
                        <div class="cms-card-actions">
                            <i class="fa fa-pencil" style="color:#007bff; cursor:pointer;" onclick="CMS.editResource('${dbId}')" title="Edit Resource Details"></i>
                            <i class="fa fa-trash-o" style="color:#ff4d4d; cursor:pointer;" onclick="CMS.deleteElement('res-${dbId}-title', 'resources-page', '${dbId}')" title="Delete Resource"></i>
                        </div>
                    </div>`;
                });
                html += `</div>`;
                return html;
            }
        }

        // 2. Fallback to DOM (Legacy / Soft items)
        const items = document.querySelectorAll(`#${gridId} .product-item[data-category]`);
        if (items.length > 0) {
            items.forEach((item) => {
                const cat = item.getAttribute('data-category');
                const link = item.querySelector('a')?.getAttribute('href') || '#';
                const title = item.querySelector('h5, h6, .resource-title')?.innerText || item.querySelector('a')?.innerText || 'Untitled Resource';
                const desc = item.querySelector('p, .resource-desc')?.innerText || '';
                const img = item.querySelector('img')?.src || '';
                const imgId = item.querySelector('img')?.getAttribute('data-cms') || '';
                const titleId = (item.querySelector('h5, h6') || {}).getAttribute ? item.querySelector('h5, h6')?.getAttribute('data-cms') : '';

                const dbId = item.getAttribute('data-res-id') || '';

                html += `<div class="cms-module-card" style="margin-bottom:12px;" data-res-id="${dbId}">
                    <div style="width:80px; height:55px; border-radius:6px; overflow:hidden; flex-shrink:0; position:relative; background:#eee;">
                        ${img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><i class="fa fa-file-pdf-o fa-2x" style="color:#ccc;"></i></div>'}
                        ${imgId ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.4);color:white;font-size:0.55rem;font-weight:800;cursor:pointer;" onclick="CMS.triggerImagePickerForForm('${imgId}')">CHANGE</div>` : ''}
                    </div>
                    <div style="flex-grow:1;">
                        <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px;">
                            <span style="background:#1a5fa8;color:#fff;font-size:0.6rem;font-weight:800;padding:2px 8px;border-radius:20px;text-transform:uppercase;">${cat}</span>
                            ${link !== '#' ? `<a href="${link}" target="_blank" style="font-size:0.7rem;color:#aaa;text-decoration:none;"><i class="fa fa-external-link"></i> View Page</a>` : ''}
                            ${(link.startsWith('blog-') || link.startsWith('webinar-')) ? `<button style="background:#fff2f2; color:#d11f26; border:1px solid #d11f26; font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:4px; cursor:pointer;" onclick="CMS.openPage('${link}')">EDIT INTERIOR CONTENT</button>` : ''}
                        </div>
                        <div style="font-weight:800;color:#222;font-size:0.9rem;margin-bottom:3px;" ${dbId ? `contenteditable="true" onblur="CMS.updateElement('res-${dbId}-title', 'text', this.innerText)"` : (titleId ? `contenteditable="true" onblur="CMS.updateElement('${titleId}','text',this.innerText)"` : '')}>${title}</div>
                        <div style="font-size:0.8rem;color:#777; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word;" title="${desc.replace(/"/g, '&quot;')}">
                            ${desc.split(' ').length > 16 ? desc.split(' ').slice(0, 16).join(' ') + '...' : (desc.length > 80 ? desc.substring(0, 80) + '...' : desc)}
                        </div>
                    </div>
                    <div class="cms-card-actions">
                        <i class="fa fa-pencil" style="color:#007bff; cursor:pointer;" onclick="CMS.editResource('${dbId}')" title="Edit Resource Details"></i>
                        <i class="fa fa-trash-o" style="color:#ff4d4d; cursor:pointer;" onclick="CMS.deleteElement('${titleId || 'res-title'}', 'resources-page', '${dbId}')" title="Delete Resource"></i>
                    </div>
                </div>`;
            });
        } else {
            html += `<div style="text-align:center;padding:30px;color:#aaa;">
                <i class="fa fa-info-circle fa-2x" style="margin-bottom:10px;"></i>
                <p>Welcome! Add a resource using the button above. They will sync to the <a href="resources.html" style="color:#d11f26;font-weight:700;">Resources page</a> automatically.</p>
            </div>`;
        }

        html += `</div>`;
        return html;
    },

    showAddResourceForm() {
        this.currentEditId = null;
        const form = document.getElementById('cms-resource-form');
        if (form) {
            form.style.display = 'block';
            const fields = ['new-res-title', 'new-res-desc', 'new-res-img', 'new-res-link'];
            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = "";
            });
            form.scrollIntoView({ behavior: 'smooth' });
        }
    },

    editResource(dbId) {
        this.currentEditId = dbId;
        const res = this.state.resources.find(r => r.id === dbId);
        const form = document.getElementById('cms-resource-form');
        if (form && res) {
            form.style.display = 'block';
            document.getElementById('new-res-title').value = res.title || "";
            document.getElementById('new-res-product').value = res.category || "";
            document.getElementById('new-res-tab').value = res.document_type || "";
            document.getElementById('new-res-desc').value = this.stripHtml(res.description || "");
            document.getElementById('new-res-img').value = res.thumbnail_url || "";
            if (document.getElementById('new-res-link')) {
                document.getElementById('new-res-link').value = res.file_url || "";
            }
            form.scrollIntoView({ behavior: 'smooth' });
        }
    },

    _resDefaultThumb(tab, product) {
        const map = RESOURCE_DEFAULT_THUMBS[tab] || {};
        return map[product] || null;
    },

    applyResourceDefaultThumb() {
        const product = document.getElementById('new-res-product')?.value;
        const tab = document.getElementById('new-res-tab')?.value;
        const imgEl = document.getElementById('new-res-img');
        if (!imgEl) return;
        const cur = (imgEl.value || '').trim();
        // Collect every known default URL to detect if the current value is itself a default.
        const allDefaults = [];
        Object.values(RESOURCE_DEFAULT_THUMBS).forEach(m => Object.values(m).forEach(u => allDefaults.push(u)));
        const isDefault = allDefaults.includes(cur);
        const url = this._resDefaultThumb(tab, product);
        // Only auto-fill when empty or when it currently holds a default (never overwrite a custom image)
        if ((!cur || isDefault) && url) imgEl.value = url;
    },

    async saveNewResource() {
        const title = document.getElementById('new-res-title')?.value?.trim();
        const product = document.getElementById('new-res-product')?.value;
        const tab = document.getElementById('new-res-tab')?.value;
        const desc = document.getElementById('new-res-desc')?.value?.trim();
        let img = document.getElementById('new-res-img')?.value?.trim() || "";
        // Auto-apply the product's default thumbnail for this tab when none is provided
        if (!img) { const def = this._resDefaultThumb(tab, product); if (def) img = def; }
        let link = document.getElementById('new-res-link')?.value?.trim() || "";

        const isUpdate = !!this.currentEditId;
        const resId = this.currentEditId;

        const isBlogOrWebinar = (tab === 'pane-blog' || tab === 'pane-webinar');
        const isVideo = (tab === 'pane-videos');

        if (!title) {
            this.showStatus('Title is required.', 'error');
            return;
        }

        if (!isBlogOrWebinar && !link) {
            this.showStatus('File link or Video link is required.', 'error');
            return;
        }

        // Handle YouTube Link Conversion
        if (isVideo && link) {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = link.match(regExp);
            if (match && match[7].length === 11) {
                link = match[7];
            }
        }

        const gridId = tab ? tab.replace('pane-', 'grid-') : 'grid-docs';
        const container = document.getElementById(gridId) || document.querySelector('.product-section .row');

        // Logic for badge color/text based on tab
        let badgeClass = 'badge-doc';
        let badgeText = 'Technical Doc';
        if (tab === 'pane-downloads') { badgeClass = 'badge-download'; badgeText = 'Download'; }
        else if (tab === 'pane-videos') { badgeClass = 'badge-video'; badgeText = 'Video'; }
        else if (tab === 'pane-blog') { badgeClass = 'badge-blog'; badgeText = 'Blog'; }
        else if (tab === 'pane-webinar') { badgeClass = 'badge-webinar'; badgeText = 'Webinar'; }
        else if (tab === 'pane-events') { badgeClass = 'badge-whitepaper'; badgeText = 'White Paper'; }

        // We no longer strictly require a container for the database save to succeed,
        // but we'll show a warning if on a page where live preview won't update immediately.
        if (!container && this.currentPage !== 'resources') {
            console.log('[CMS] Resource container not on this page. Saving to database only.');
        }

        const nextIdx = this.getNextId('res');

        try {
            this.isSaving = true;
            const url = isUpdate ? `/api/v2/resources/${resId}` : `/api/v2/resources`;
            const method = isUpdate ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    category: product,
                    document_type: tab,
                    thumbnail_url: img,
                    file_url: link,
                    description: desc,
                    is_active: true,
                    is_deleted: false,
                    published_date: new Date().toISOString()
                })
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Server responded with ${response.status}`);
            }

            const dbData = await response.json();
            const savedResource = dbData.resource || dbData;

            if (container) {
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 product-item';
                col.setAttribute('data-category', product);
                col.setAttribute('data-res-id', savedResource.id);

                const finalLink = savedResource.file_url;
                let cardMedia = `<a href="${finalLink}" ${(tab === 'pane-blog' || tab === 'pane-webinar') ? '' : 'target="_blank"'}><img src="${img || ''}" onerror="this.src='https://picsum.photos/seed/${nextIdx}/400/225'" data-cms="res-${nextIdx}-img"></a>`;

                if (tab === 'pane-videos') {
                    let videoSrc = finalLink;
                    if (!videoSrc.startsWith('http')) videoSrc = `https://www.youtube.com/embed/${videoSrc}`;
                    else if (videoSrc.includes('watch?v=')) videoSrc = videoSrc.replace('watch?v=', 'embed/');

                    cardMedia = `
                        <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
                            <iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                                src="${videoSrc}" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen></iframe>
                        </div>`;
                }

                col.innerHTML = `
                    <div class="product-card">
                        <div class="product-img">${cardMedia}</div>
                        <div class="pt-3">
                            <span class="resource-badge ${badgeClass}">${badgeText}</span>
                            <h6><a href="${finalLink}" ${(tab === 'pane-videos' || tab === 'pane-blog' || tab === 'pane-webinar') ? '' : 'target="_blank"'} class="text-dark" style="text-decoration:none;" data-cms="res-${nextIdx}-title">${title}</a></h6>
                            <p data-cms="res-${nextIdx}-desc">${desc || 'Click to access content.'}</p>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            }

            const resForm = document.getElementById('cms-resource-form');
            if (resForm) resForm.style.display = 'none';
            this.enableEditing();
            this.renderTab('resources-page');

            // Standardized Success Alerts for Resources
            if (isBlogOrWebinar) {
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                const pageFilename = `${tab === 'pane-blog' ? 'blog' : 'webinar'}-${slug}.html`;
                
                const alertTitle = isUpdate ? 'Resource Updated' : 'Resource Created';
                const bodyMsg = isUpdate 
                    ? `The ${tab.replace('pane-', '')} article has been successfully updated.\n\nFilename: ${pageFilename}\n\nWould you like to open the updated previous page now to continue editing?`
                    : `A new ${tab.replace('pane-', '')} article has been successfully created and the dynamic page generated.\n\nFilename: ${pageFilename}\n\nWould you like to open the new page now to edit its content?`;

                await this.showConfirm(alertTitle, bodyMsg, 'OPEN PAGE', 'CLOSE')
                .then(shouldOpen => {
                    if (shouldOpen) {
                        window.location.href = `${pageFilename}?cms_dashboard=true&cms_tab=${this.activeTab || 'resources-page'}`;
                    } else {
                        this.refreshWithState();
                    }
                });
            } else {
                this.showStatus(isUpdate ? 'Resource updated!' : `Resource added to ${badgeText} section!`, 'success');
                this.refreshWithState();
            }

            this.currentEditId = null;
        } catch (e) {
            console.error('V2 saveNewResource error', e);
            this.showStatus('Failed to save to database. Check console.', 'error');
        }
    },

    setResourceCategory(cat) {
        this.activeResCategory = cat;
        this.activeResProductFilter = '';
        this.renderTab('resources-page');
    },

    setResProductFilter(product) {
        this.activeResProductFilter = product;
        this.renderTab('resources-page');
    },

    renderResourcesList() {
        let html = `
            <div class="cms-tab-scroll">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <p class="text-muted m-0">Manage blog articles and resources.</p>
                    <button class="cms-add-btn" onclick="CMS.addResource()"><i class="fa fa-plus"></i> ADD ARTICLE</button>
                </div>
        `;

        const posts = Array.from(document.querySelectorAll('[data-cms^="post-"][data-cms$="-title"]'))
            .filter(el => !el.closest('.slick-cloned'));

        posts.forEach((el, index) => {
            const idAttr = el.getAttribute('data-cms');
            const idNum = idAttr.split('-')[1];

            const title = el.innerText || '';
            const desc = document.querySelector(`[data-cms="post-${idNum}-desc"]`)?.innerText || '';
            const date = document.querySelector(`[data-cms="post-${idNum}-date"]`)?.innerText || '';
            const img = document.querySelector(`[data-cms="post-${idNum}-img"]`)?.src || '';

            html += `
                <div class="cms-module-card cms-post-card">
                    <div style="position:relative">
                        <img src="${img}" class="cms-post-thumb">
                        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.5); color:white; padding:4px 8px; border-radius:4px; font-size:0.6rem; font-weight:800; cursor:pointer" onclick="CMS.triggerImagePickerForForm('post-${idNum}-img')">CHANGE</div>
                    </div>
                    <div style="flex-grow:1">
                        <div class="cms-post-meta-line" contenteditable="true" onblur="CMS.updateElement('post-${idNum}-date', 'text', this.innerText)">${date}</div>
                        <div style="font-weight:800; color:#333; margin-bottom:5px;" contenteditable="true" onblur="CMS.updateElement('post-${idNum}-title', 'text', this.innerText)">${title}</div>
                        <p style="font-size:0.8rem; color:#777; margin:0; line-height:1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word;" title="${desc.replace(/"/g, '&quot;')}">
                            ${desc.split(' ').length > 16 ? desc.split(' ').slice(0, 16).join(' ') + '...' : (desc.length > 80 ? desc.substring(0, 80) + '...' : desc)}
                        </p>
                    </div>
                    <div class="cms-card-actions">
                         <i class="fa fa-caret-up" onclick="CMS.moveElement('post-${idNum}-title', 'up')"></i>
                         <i class="fa fa-caret-down" onclick="CMS.moveElement('post-${idNum}-title', 'down')"></i>
                         <i class="fa fa-trash-o" style="color:#ff4d4d" onclick="CMS.deleteElement('post-${idNum}-title', 'resources')"></i>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        return html;
    },

    openDashboard() {
        this.dashboardModal.style.display = 'flex';
        setTimeout(() => {
            const menu = this.dashboardModal.querySelector('.cms-menu');
            if (menu) menu.scrollLeft = 0;
        }, 50);
    },

    closeDashboard() {
        this.dashboardModal.style.display = 'none';
    },

    openPage(file) {
        this.navigatingInternally = true;
        const url = new URL(file, window.location.origin);
        url.searchParams.set('cms_dashboard', 'true');
        if (this.activeTab) {
            url.searchParams.set('cms_tab', this.activeTab);
        }
        window.location.href = url.toString();
    },

    getNextId(prefix) {
        let max = 0;
        document.querySelectorAll(`[data-cms^="${prefix}-"]`).forEach(el => {
            const parts = el.getAttribute('data-cms').split('-');
            const id = parseInt(parts[1]);
            if (!isNaN(id) && id > max) max = id;
        });
        return max + 1;
    },

    async addSolution() {
        // -- V2: Create solution in the database first, then add to DOM --
        try {
            const response = await fetch(`/api/v2/solutions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title: 'NEW SOLUTION', short_description: 'Click to edit description.' })
            });

            if (!response.ok) throw new Error('API call failed');
            const { solution } = await response.json();

            // Add to local state
            this.state.solutions.push(solution);

            // Add to DOM
            const container = document.querySelector('.ttm-vertical_sep') || document.querySelector('.solutions-row') || document.querySelector('.ttm-row .row');
            if (!container) {
                this.showStatus('Solutions container not found.', 'error');
                return;
            }

            const nextIdx = this.getNextId('feat');
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 col-lg-4 margin_bottom30';
            col.setAttribute('data-sol-id', solution.id); // Store DB UUID on the DOM element
            col.innerHTML = `
                <div class="featured-icon-box icon-align-top-content style1">
                    <div class="featured-content">
                        <div class="featured-title">
                            <h3 data-cms="feat-${nextIdx}-title"><span>NEW</span> SOLUTION</h3>
                        </div>
                        <div class="featured-desc">
                            <p data-cms="feat-${nextIdx}-desc">Click to edit description.</p>
                        </div>
                        <a class="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-skincolor" href="#" data-cms="feat-${nextIdx}-link">read more</a>
                    </div>
                </div>
            `;
            container.appendChild(col);
            this.enableEditing();
            this.renderTab('solutions');

            const slug = 'new-solution'; // Default for quick add if not provided by backend
            const sSlug = solution.slug || slug;
            const pageFilename = `solution-${sSlug}.html`;

            const alertTitle = isUpdate ? 'Solution Updated' : 'Solution Created';
            const bodyMsg = isUpdate 
                ? `Solution has been updated.\n\nFilename: ${pageFilename}\n\nWould you like to open the updated page now to continue editing?`
                : `A new solution has been successfully created and the dynamic page generated.\n\nFilename: ${pageFilename}\n\nWould you like to open the new page now to edit its content?`;

            await this.showConfirm(alertTitle, bodyMsg, 'OPEN PAGE', 'CLOSE')
            .then(shouldOpen => {
                if (shouldOpen) {
                    window.location.href = `${pageFilename}?cms_dashboard=true&cms_tab=${this.activeTab || 'solutions'}`;
                } else {
                    this.refreshWithState();
                }
            });

            col.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {
            console.error('V2 addSolution error, falling back to DOM-only mode', e);
            // Fallback: DOM-only
            const container = document.querySelector('.ttm-vertical_sep') || document.querySelector('.ttm-row .row');
            if (!container) { this.showStatus('Solutions container not found.', 'error'); return; }
            const nextIdx = this.getNextId('feat');
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 col-lg-4 margin_bottom30';
            col.innerHTML = `<div class="featured-icon-box icon-align-top-content style1"><div class="featured-content"><div class="featured-title"><h3 data-cms="feat-${nextIdx}-title"><span>NEW</span> SOLUTION</h3></div><div class="featured-desc"><p data-cms="feat-${nextIdx}-desc">Click to edit.</p></div></div></div>`;
            container.appendChild(col);
            this.enableEditing();
            this.renderTab('solutions');
            this.showStatus('Solution added. Save to persist.', 'info');
        }
    },

    deleteElement(id, tab, dbId = null) {
        this.confirmAction("This action is permanent and will remove associated files. Continue?", () => {
            (async () => {
                const el = document.querySelector(`[data-cms="${id}"]`);
                let success = false;

                // -- V2: Call the API to hard-delete from DB if we have a UUID --
                if (dbId && dbId.includes('-')) {
                    let endpoint = '';
                    if (tab === 'case-studies') endpoint = `/v2/stories/${dbId}`;
                    else if (tab === 'solutions') endpoint = `/v2/solutions/${dbId}`;
                    else if (tab === 'apps') endpoint = `/v2/applications/${dbId}`;
                    else if (tab === 'resources-page') endpoint = `/v2/resources/${dbId}`;

                    if (endpoint) {
                        try {
                            const res = await fetch(`/api${endpoint}`, {
                                method: 'DELETE',
                                credentials: 'include'
                            });
                            if (res.ok) {
                                success = true;
                                // Update local state arrays
                                if (tab === 'case-studies' && this.state.stories) this.state.stories = this.state.stories.filter(s => s.id !== dbId);
                                if (tab === 'solutions' && this.state.solutions) this.state.solutions = this.state.solutions.filter(s => s.id !== dbId);
                                if (tab === 'apps' && this.state.applications) this.state.applications = this.state.applications.filter(a => a.id !== dbId);
                                if (tab === 'resources-page' && this.state.resources) this.state.resources = this.state.resources.filter(r => r.id !== dbId);
                            } else {
                                const err = await res.json();
                                this.showStatus(`Delete failed: ${err.error || 'Unknown error'}`, 'error');
                                return;
                            }
                        } catch (e) {
                            console.error('Delete API Error:', e);
                            this.showStatus('Network error during deletion.', 'error');
                            return;
                        }
                    }
                } else {
                    // Fallback for non-V2 items (soft removal from current layout)
                    success = true;
                }

                if (success) {
                    // -- DOM Cleanup --
                    const containerClasses = '.col-md-4, .col-lg-4, .col-sm-4, .col-sm-6, .featured-imagebox, .featured-icon-box, .product-item, .cms-module-card';

                    // 1. Remove from the Dashboard List instantly
                    const dashboardCard = document.querySelector(`[onclick*="'${dbId}'"]`)?.closest('.cms-module-card') ||
                        document.querySelector(`[data-res-id="${dbId}"]`) ||
                        document.querySelector(`[data-story-id="${dbId}"]`);
                    if (dashboardCard) dashboardCard.remove();

                    // 2. Remove from the Live Website Page DOM
                    if (id) {
                        const elOnPage = document.querySelector(`[data-cms="${id}"]`);
                        if (elOnPage) {
                            const slider = elOnPage.closest('.slick-initialized');
                            if (slider && window.jQuery) {
                                const slide = elOnPage.closest('.slick-slide');
                                const slideIndex = jQuery(slider).find('.slick-slide:not(.slick-cloned)').index(slide);
                                if (slideIndex !== -1) jQuery(slider).slick('slickRemove', slideIndex);
                                else elOnPage.closest(containerClasses)?.remove();
                            } else {
                                const container = elOnPage.closest(containerClasses);
                                if (container) container.remove();
                                else elOnPage.remove();
                            }
                        }
                    }

                    // Cleanup pending changes
                    delete this.pendingChanges[id];

                    // Refresh dashboard view and page
                    if (tab) this.renderTab(tab);
                    this.showStatus('Item deleted successfully!', 'success');
                    setTimeout(() => this.refreshWithState(), 1000);

                    this.showStatus('Item permanently deleted.', 'success');
                }
            })();
        });
    },

    moveElement(id, direction) {
        const el = document.querySelector(`[data-cms="${id}"]`);
        if (!el) return;

        let target = direction === 'up' ? el.previousElementSibling : el.nextElementSibling;
        if (!target) return;

        if (direction === 'up') {
            target.before(el);
        } else {
            target.after(el);
        }
        // Manual save required to persist reordering
        this.showStatus('Order changed. Click Save Changes to keep it.', 'info');
    },

    updateResourceField(dbId, field, value) {
        // Redirection to standard updateElement flow to prevent auto-save
        this.updateElement(`res-${dbId}-${field === 'description' ? 'desc' : field}`, 'text', value);
    },

    async _checkAuthentication() {
        const container = el.closest('.col-md-4, .col-lg-4, .col-sm-4');
        if (!container) return;

        if (direction === 'up' && container.previousElementSibling) {
            container.parentNode.insertBefore(container, container.previousElementSibling);
        } else if (direction === 'down' && container.nextElementSibling) {
            container.parentNode.insertBefore(container.nextElementSibling, container);
        }
        this.renderTab('solutions');
    },

    getNextId(prefix) {
        const ids = Array.from(document.querySelectorAll(`[data-cms^="${prefix}-"][data-cms$="-title"]:not(.slick-cloned)`))
            .map(el => parseInt(el.getAttribute('data-cms').split('-')[1]))
            .filter(n => !isNaN(n));
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    },

    addApplication() {
        const row = document.querySelector('.application-slider .slick_slider') ||
            document.querySelector('.applications-row') ||
            document.querySelector('.ttm-row[id*="applications"] .row') ||
            document.querySelector('.ttm-row:nth-of-type(3) .row');

        if (!row) {
            this.showStatus('Application container not found on this page.', 'error');
            return;
        }

        const nextIdx = this.getNextId('app');
        const html = `
            <div class="featured-imagebox featured-imagebox-services style1">
                <div class="featured-content pt-0">
                    <div class="featured-thumbnail text-center padding_top20 padding_bottom20">
                        <i class="fa fa-cube fa-3x ttm-textcolor-skincolor" data-cms="app-${nextIdx}-icon"></i>
                    </div>
                    <div class="featured-title">
                        <h3 class="mb-0">
                            <a href="#" data-cms="app-${nextIdx}-title">NEW APPLICATION</a>
                        </h3>
                    </div>
                </div>
            </div>
        `;

        if (window.jQuery && jQuery(row).hasClass('slick-initialized')) {
            jQuery(row).slick('slickAdd', html);
        } else {
            const div = document.createElement('div');
            div.innerHTML = html;
            row.appendChild(div.firstElementChild);
        }

        this.enableEditing();
        this.renderTab('apps');
        this.showStatus('Added new application. Click Save Changes to keep it.', 'info');
    },

    addResource() {
        const row = document.querySelector('.blog-section .slick_slider');
        if (!row) {
            console.error('CMS: Resources slider not found!');
            return;
        }

        const nextIdx = this.getNextId('post');
        const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

        const html = `
            <div class="col-lg-4">
                <div class="featured-imagebox featured-imagebox-post style1">
                    <div class="featured-thumbnail">
                        <img class="img-fluid" src="images/blog/blog-01-600x430.jpg" data-cms="post-${nextIdx}-img" />
                    </div>
                    <div class="featured-content">
                        <div class="ttm-box-post-date">
                            <span class="ttm-entry-date" data-cms="post-${nextIdx}-tag"> ARTICLE </span>
                        </div>
                        <div class="post-meta">
                            <span class="ttm-meta-line byline" data-cms="post-${nextIdx}-date">${dateStr}</span>
                        </div>
                        <div class="featured-title">
                            <h3><a href="#" data-cms="post-${nextIdx}-title">NEW RESOURCE TITLE</a></h3>
                        </div>
                        <div class="featured-desc">
                            <p data-cms="post-${nextIdx}-desc">Description of the new resource goes here. Click to edit.</p>
                        </div>
                        <a class="ttm-btn ttm-btn-size-md ttm-btn-color-dark btn-inline" href="#">read more</a>
                    </div>
                </div>
            </div>
        `;

        if (window.jQuery && jQuery(row).hasClass('slick-initialized')) {
            jQuery(row).slick('slickAdd', html);
        } else {
            const div = document.createElement('div');
            div.innerHTML = html;
            row.appendChild(div.firstElementChild);
        }

        this.enableEditing();
        this.renderTab('resources');
        this.showAlert('Module Added', 'New article added to the blog slider! Remember to click Save Changes.');
    },

    enableEditing() {
        // 1. Auto-tagging is already handled by tagElements() in init()

        // 2. Attach listeners and set state
        document.querySelectorAll('[data-cms]').forEach(el => {
            const elId = el.getAttribute('data-cms');

            // All global content keys (header + footer) ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â editable on ANY page
            const editableOnAnyPage = [
                'header-email', 'header-address', 'header-facebook-link', 'header-linkedin-link',
                'header-enquiry', 'header-credit-text', 'header-credit-link',
                'footer-address', 'footer-phone-1', 'footer-phone-2', 'footer-email', 'footer-tagline',
                'footer-facebook-link', 'footer-linkedin-link'
            ];
            // Logo-only keys still restricted (image upload, homepage only)
            const logoOnlyKeys = ['site-logo', 'footer-logo', 'client-logo-1', 'client-logo-2', 'client-logo-3', 'client-logo-4', 'client-logo-5', 'client-logo-6', 'client-logo-1-link', 'client-logo-2-link', 'client-logo-3-link', 'client-logo-4-link', 'client-logo-5-link', 'client-logo-6-link'];
            // BaseLok PRO promo keys Ã¢â‚¬&rdquo; global images editable from any application/sub page
            const bproGlobalKeys = ['bpro-global-logo', 'bpro-global-device', 'bpro-global-heading'];
            const isProtectedGlobal = logoOnlyKeys.includes(elId);
            const isEditableGlobal = editableOnAnyPage.includes(elId) || bproGlobalKeys.includes(elId);
            const isHomepage = this.currentPage === 'index' || this.currentPage === '';

            const bg = window.getComputedStyle(el).backgroundImage;
            const type = (el.tagName === 'IMG' || (bg !== 'none' && bg.includes('url'))) ? 'image' : 'text';

            if (type === 'text') {
                // Global content keys editable on any page; logo keys only on homepage
                const canEdit = isEditableGlobal ? this.isEditing : (isProtectedGlobal ? isHomepage : this.isEditing);
                el.contentEditable = (this.isEditing && canEdit) ? 'true' : 'false';

                if (el.tagName === 'A') {
                    el.onclick = (e) => {
                        if (this.isEditing && canEdit) {
                            e.preventDefault();
                            e.stopPropagation();
                            // Do NOT open link editor on the case-studies listing page
                            if (this.currentPage === 'case-studies') return;
                            this.openLinkEditor(el);
                        }
                    };
                }

                // -- PERSISTENT BULLET LOGIC --
                if (el.hasAttribute('data-persistent-bullets')) {
                    el.addEventListener('keydown', (e) => {
                        if (!this.isEditing) return;

                        // Prevent deleting the last LI
                        if (e.key === 'Backspace' || e.key === 'Delete') {
                            const lis = el.querySelectorAll('li');
                            if (lis.length <= 1 && el.innerText.trim().length <= 1) {
                                // If it's the last bullet and it's almost empty, stop deletion
                                e.preventDefault();
                            }
                        }
                        
                        // Force list structure on Enter if browser tries to break out
                        if (e.key === 'Enter') {
                            setTimeout(() => {
                                if (el.querySelector('div, p')) {
                                    // If browser injected a div/p instead of li, fix it
                                    document.execCommand('insertUnorderedList');
                                }
                            }, 10);
                        }
                    });
                }

                
                // AUTO-CLONE CUSTOM ICONS FOR LISTS
                if (el.tagName === 'UL' || el.tagName === 'OL') {
                    el.addEventListener('keydown', (e) => {
                        if (!this.isEditing) return;
                        if (e.key === 'Enter') {
                            setTimeout(() => {
                                const sel = window.getSelection();
                                if (!sel.rangeCount) return;
                                let node = sel.anchorNode;
                                if (node && node.nodeType === 3) node = node.parentNode;
                                const currentLi = node ? node.closest('li') : null;
                                if (currentLi) {
                                    const prevLi = currentLi.previousElementSibling;
                                    if (prevLi && prevLi.tagName === 'LI') {
                                        const icon = prevLi.querySelector('i.fa, i.ti');
                                        if (icon && !currentLi.querySelector('i.fa, i.ti')) {
                                            const newIcon = icon.cloneNode(true);
                                            currentLi.style.cssText = prevLi.style.cssText;

                                            let span = currentLi.querySelector('span');
                                            if (!span) {
                                                const prevSpan = prevLi.querySelector('span');
                                                span = document.createElement('span');
                                                if (prevSpan && prevSpan.style.cssText) {
                                                    span.style.cssText = prevSpan.style.cssText;
                                                }
                                                // Move all browser-injected content (like <br> or raw text) into the span
                                                while (currentLi.firstChild) {
                                                    span.appendChild(currentLi.firstChild);
                                                }
                                                currentLi.appendChild(span);
                                            }

                                            // Insert the icon before the span
                                            currentLi.insertBefore(newIcon, currentLi.firstChild);
                                        }
                                    }
                                }
                            }, 10);
                        }
                    });
                }

                el.addEventListener('blur', () => {
                    let isSimpleText = !el.querySelector('p, div, br, b, i, strong, em, li, a, span, sup, sub, u');
                    let cleanValue = isSimpleText ? el.innerText.trim() : el.innerHTML.trim();
                    
                    // Auto-format trademark symbols back to superscript immediately on blur
                    if (cleanValue.includes('®') || cleanValue.includes('™') || cleanValue.includes('&reg;') || cleanValue.includes('&trade;')) {
                        cleanValue = cleanValue
                            .replace(/<sup>\u00AE<\/sup>|<sup>&reg;<\/sup>/gi, '\u00AE')
                            .replace(/<sup>\u2122<\/sup>|<sup>&trade;<\/sup>/gi, '\u2122')
                            .replace(/\u00AE|&reg;/gi, '<sup>&reg;</sup>')
                            .replace(/\u2122|&trade;/gi, '<sup>&trade;</sup>');
                        el.innerHTML = cleanValue;
                    }
                    
                    this.updateElement(elId, 'text', cleanValue);
                });
            }
        });

        // Add hint for product main image in edit mode
        const mainImage = document.getElementById('mainImage');
        if (mainImage && this.isEditing && !this.currentPage.startsWith('case-study-')) {
            mainImage.style.pointerEvents = 'none'; // CRITICAL: Physically block clicks
            
            const container = mainImage.closest('.product-main-img');
            if (container && !document.getElementById('cms-main-image-hint')) {
                container.style.position = 'relative';
                const hint = document.createElement('div');
                hint.id = 'cms-main-image-hint';
                hint.innerHTML = '<i class="fa fa-info-circle"></i> Edit photo below';
                Object.assign(hint.style, {
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(209, 31, 38, 0.9)', // Theme red
                    color: '#fff',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    pointerEvents: 'none',
                    zIndex: '10',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                });
                container.appendChild(hint);
            }
        } else if (mainImage && !this.isEditing) {
            mainImage.style.pointerEvents = '';
            const hint = document.getElementById('cms-main-image-hint');
            if (hint) hint.remove();
        }

        // 3. Setup Global Image Hover Overlay
        this.setupGlobalImageHover();

        // 4. Setup Dynamic Item Controls (Add/Remove)
        this.setupDynamicControls();
    },

    setupDynamicControls() {
        if (document.getElementById('cms-dynamic-controls')) return;

        const controls = document.createElement('div');
        controls.id = 'cms-dynamic-controls';
        Object.assign(controls.style, {
            position: 'fixed',
            bottom: '80px',
            right: '30px',
            zIndex: '1000001',
            display: this.isEditing ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '10px'
        });

        // Add "Add Application" Button
        const addBtn = document.createElement('button');
        addBtn.className = 'ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor';
        addBtn.innerHTML = '<i class="fa fa-plus ms-1"></i> Add Application Item';
        addBtn.onclick = () => this.addGalleryItem('application-gallery');
        controls.appendChild(addBtn);

        document.body.appendChild(controls);
    },

    addGalleryItem(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const index = container.children.length + 1;
        const pageSlug = this.getSlug();
        const itemId = `item-${pageSlug}-${index}`;

        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 app-gallery-item-wrapper';
        col.innerHTML = `
            <div class="app-gallery-item" id="${itemId}">
                <div class="app-gallery-img-container">
                    <img data-cms="${pageSlug}-app-img-${index}" src="images/placeholder.png" alt="Application" class="img-fluid">
                    <div class="cms-item-controls">
                        <button class="cms-ctrl-btn edit-img" onclick="CMS.editItemImage(this)" title="Change Image"><i class="fa fa-camera"></i></button>
                        <button class="cms-ctrl-btn toggle-img" onclick="CMS.toggleItemImage(this)" title="Show/Hide Image"><i class="fa fa-image"></i></button>
                        <button class="cms-ctrl-btn remove" onclick="this.closest('.app-gallery-item-wrapper').remove(); CMS.saveLayout();" title="Remove Item"><i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="app-gallery-content text-center mt-2">
                    <div class="cms-color-controls mb-2" style="display: ${this.isEditing ? 'flex' : 'none'}; justify-content: center; gap: 5px;">
                        <span class="color-dot" style="background:#d11f26;" onclick="CMS.setItemColor(this, '#d11f26')"></span>
                        <span class="color-dot" style="background:#333;" onclick="CMS.setItemColor(this, '#333')"></span>
                        <span class="color-dot" style="background:#fff; border:1px solid #ddd;" onclick="CMS.setItemColor(this, '#fff')"></span>
                    </div>
                    <h5 data-cms="${pageSlug}-app-title-${index}" style="font-weight:700; transition: color 0.3s;">NEW APPLICATION</h5>
                    <p data-cms="${pageSlug}-app-desc-${index}" style="font-size:0.9rem; color:#666;">Description details go here. Click to edit.</p>
                </div>
            </div>
        `;
        container.appendChild(col);
        this.enableEditing();
        this.saveLayout();
        this.showStatus('New item added!', 'info');
    },

    toggleItemImage(btn) {
        const item = btn.closest('.app-gallery-item');
        const imgContainer = item.querySelector('.app-gallery-img-container');
        const img = imgContainer.querySelector('img');
        if (window.getComputedStyle(img).display === 'none') {
            img.style.display = 'block';
            imgContainer.style.aspectRatio = '4/3';
        } else {
            img.style.display = 'none';
            imgContainer.style.aspectRatio = 'initial';
            imgContainer.style.height = '0';
        }
        this.saveLayout();
    },

    editItemImage(btn) {
        const item = btn.closest('.app-gallery-item');
        const img = item.querySelector('img');
        if (img) {
            this.activeImageElement = img;
            this.openImagePicker();
        }
    },

    setItemColor(dot, color) {
        const content = dot.closest('.app-gallery-content');
        const title = content.querySelector('h5');
        title.style.color = color;
        this.saveLayout();
    },

    saveLayout() {
        // Find all dynamic containers and store their innerHTML in PAGE_LAYOUT
        const dynamicSections = ['application-gallery'];
        const layout = {};
        
        dynamicSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) layout[id] = el.innerHTML;
        });

        this.updateElement('PAGE_LAYOUT', 'text', JSON.stringify(layout));
    },

    applyLayout(layout) {
        if (!layout) return;
        Object.entries(layout).forEach(([id, html]) => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = html;
                // Force UI visibility based on Edit Mode
                el.querySelectorAll('.cms-item-controls, .cms-color-controls').forEach(ctrl => {
                    ctrl.style.display = this.isEditing ? 'flex' : 'none';
                });
            }
        });
    },



    setupGlobalImageHover() {
        if (document.getElementById('cms-global-image-edit-btn')) return;

        const overlay = document.createElement('div');
        overlay.id = 'cms-global-image-edit-btn';
        overlay.innerHTML = '<i class="fa fa-camera"></i> Change Image';
        Object.assign(overlay.style, {
            position: 'fixed',
            zIndex: '1000000',
            background: 'rgba(209, 31, 38, 0.95)',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'none',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            pointerEvents: 'auto',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap'
        });
        document.body.appendChild(overlay);

        this.hoverTarget = null;
        let isHoveringOverlay = false;

        overlay.addEventListener('mouseenter', () => isHoveringOverlay = true);
        overlay.addEventListener('mouseleave', () => isHoveringOverlay = false);

        overlay.addEventListener('click', (e) => {
            if (!document.body.classList.contains('cms-edit-mode')) return;
            e.preventDefault();
            e.stopPropagation();
            if (this.hoverTarget) {
                this.activeImageElement = this.hoverTarget;
                this.openImagePicker();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!document.body.classList.contains('cms-edit-mode')) {
                overlay.style.display = 'none';
                return;
            }
            if (isHoveringOverlay) return; // Keep overlay visible if interacting with it

            // Pierce through DOM to find images or bg-images
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            let foundImgObj = null;

            for (let el of elements) {
                if (el.id === 'cms-global-image-edit-btn') continue;
                
                // Explicitly prevent main image from triggering hover edit
                // (except on case-study pages, where the hero IS the editable image).
                if (el.id === 'mainImage' && !CMS.currentPage.startsWith('case-study-')) {
                    foundImgObj = null;
                    break;
                }

                const elId = el.getAttribute ? el.getAttribute('data-cms') : null;
                if (!elId || elId === 'no-edit') continue;

                // -- PROTECTED GLOBAL COMPONENTS (New v3 Logic) --
                // If it's a global logo and we're not on the homepage, we skip the hover edit button
                const isProtectedGlobal = ['site-logo', 'footer-logo', 'client-logo-1', 'client-logo-2', 'client-logo-3', 'client-logo-4', 'client-logo-5', 'client-logo-6'].includes(elId);
                const isHomepage = this.currentPage === 'index' || this.currentPage === '';
                if (isProtectedGlobal && !isHomepage) continue;

                const bg = window.getComputedStyle(el).backgroundImage;
                if (el.tagName === 'IMG' || (bg !== 'none' && bg.includes('url'))) {
                    foundImgObj = el;
                    break;
                }
            }

            if (foundImgObj) {
                this.hoverTarget = foundImgObj;
                const rect = this.hoverTarget.getBoundingClientRect();

                // Position at Top Right Corner
                let topPos = rect.top + 20; // 20px padding from top
                let leftPos = rect.right - 20; // 20px padding from right

                // Keep button visible even if element is partially scrolled off screen
                if (topPos < 70) topPos = 70; // 70px accounts for the fixed admin bar
                if (leftPos > window.innerWidth - 20) leftPos = window.innerWidth - 20;

                overlay.style.top = topPos + 'px';
                overlay.style.left = leftPos + 'px';
                overlay.style.transform = 'translate(-100%, 0)';
                overlay.style.display = 'block';
            } else {
                hoverTarget = null;
                overlay.style.display = 'none';
            }
        });
    },

    openImagePicker() {
        const modal = document.getElementById('cms-image-picker-modal');
        const grid = document.getElementById('cms-image-grid');
        grid.innerHTML = '';

        // Find existing images on page
        const images = new Set();
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.closest('.cms-modal')) images.add(img.src);
        });
        document.querySelectorAll('*').forEach(el => {
            if (el.closest && el.closest('.cms-modal')) return;
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg !== 'none' && bg.includes('url')) {
                const url = bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
                images.add(url);
            }
        });

        images.forEach(src => {
            const imgEl = document.createElement('img');
            imgEl.src = src;
            imgEl.style.width = '100%';
            imgEl.style.height = '100px';
            imgEl.style.objectFit = 'cover';
            imgEl.style.cursor = 'pointer';
            imgEl.style.border = '2px solid transparent';
            imgEl.style.borderRadius = '4px';
            imgEl.onmouseenter = () => imgEl.style.borderColor = '#d11f26';
            imgEl.onmouseleave = () => imgEl.style.borderColor = 'transparent';
            imgEl.onclick = () => {
                this.updateActiveImage(src);
                modal.style.display = 'none';
            };
            grid.appendChild(imgEl);
        });

        modal.style.display = 'flex';
        this.triggerImageUpload(); // Setup input listener
    },

    updateActiveImage(url, linkUrl = null) {
        if (!this.activeImageElement) return;

        if (this.activeImageElement.tagName === 'INPUT' || this.activeImageElement.type === 'hidden') {
            this.activeImageElement.value = url;
            this.activeImageElement.dispatchEvent(new Event('input', { bubbles: true }));
            this.activeImageElement.dispatchEvent(new Event('change', { bubbles: true }));
            if (this.activeImagePreviewId) {
                const previewEl = document.getElementById(this.activeImagePreviewId);
                if (previewEl) {
                    if (previewEl.tagName === 'IMG') previewEl.src = url;
                    else previewEl.style.backgroundImage = `url(${url})`;
                }
            }
        } else if (this.activeImageElement.tagName === 'IMG') {
            this.activeImageElement.src = url;
            // If this is an app icon img, show it and hide the FA icon sibling
            const id2 = this.activeImageElement.getAttribute('data-cms');
            if (id2 && id2.startsWith('app-') && id2.endsWith('-icon') && url) {
                this.activeImageElement.style.display = 'block';
                const faIcon = this.activeImageElement.parentElement?.querySelector('i.fa');
                if (faIcon) faIcon.style.display = 'none';
            }
        } else {
            this.activeImageElement.style.backgroundImage = `url(${url})`;
        }

        const id = this.activeImageElement.getAttribute('data-cms');
        if (id) {
            this.pendingChanges[id] = { type: 'image', value: url };
        }

        // NEW: Persistence for Link URL if provided
        if (linkUrl !== null) {
            const parentLink = this.activeImageElement.closest('a') || document.querySelector(`[data-cms="${id}-link"]`);
            if (parentLink) {
                parentLink.href = linkUrl;
                this.pendingChanges[`${id}-link`] = { type: 'text', value: linkUrl };
            }
        }

        // SYNC: Update the preview if the Image & Link modal is currently open
        const modalPreview = document.getElementById('cms-editor-preview');
        if (modalPreview) {
            modalPreview.src = url;
        }

        // Sync with dashboard form if it's currently open
        const formInput = document.getElementById(`input-${id}`) || document.getElementById(id);
        if (formInput) {
            formInput.value = url;
            const formThumbContainer = formInput.closest('.cms-media-preview-box') || formInput.closest('.cms-form-group');
            if (formThumbContainer) {
                const formThumb = formThumbContainer.querySelector('img.cms-media-thumb') || formThumbContainer.querySelector('.cms-hero-bg-preview');
                if (formThumb) {
                    if (formThumb.tagName === 'IMG') formThumb.src = url;
                    else formThumb.style.backgroundImage = `url(${url})`;
                }

                // NEW: Update Link input if exists in form
                const linkLabel = formThumbContainer.querySelector('.cms-image-link-label');
                const linkInput = formThumbContainer.querySelector('.cms-image-link-input');
                if (linkInput && linkUrl !== null) linkInput.value = linkUrl;
            }
        }

        // Manual save is now required for image changes per user request
        this.showStatus('Image updated. Click Save Changes to keep it.', 'info');
    },

    async restoreSnapshot(id) {
        if (!await this.showConfirm('Restore Version', 'Are you sure you want to restore this version? This will overwrite the current content on the page.')) return;

        try {
            const row = this.loadedHistory.find(r => r.id === id);
            if (!row || !row.snapshot) {
                await this.showAlert('Data Missing', 'Could not find snapshot data.');
                return;
            }
            const snapshot = row.snapshot;

            // Apply Layout if present in snapshot (restores structure before content)
            if (snapshot['PAGE_LAYOUT'] && snapshot['PAGE_LAYOUT'].value) {
                try {
                    const layout = JSON.parse(snapshot['PAGE_LAYOUT'].value);
                    this.applyLayout(layout);
                } catch (e) { console.error('Restoration: Failed to apply layout', e); }
            }

            // Clear any previous highlights
            document.querySelectorAll('.cms-restoring-highlight').forEach(el => el.classList.remove('cms-restoring-highlight'));

            for (let [entryId, data] of Object.entries(snapshot)) {
                let elId = entryId;

                // FALLBACK: Mapping for Homepage Hero (index.html)
                // Maps old auto-generated IDs from previous snapshots to new premium static IDs
                if (this.currentPage === 'index' || this.currentPage === '') {
                    // Slide 1
                    if (elId === 'auto-index-a-63' || elId === 'auto-index-h3-209') elId = 'hero-sub-1';
                    if (elId === 'auto-index-h2-64' || elId === 'auto-index-h2-212') elId = 'hero-title';
                    if (elId === 'auto-index-p-65' || elId === 'auto-index-p-216') elId = 'hero-desc';
                    if (elId === 'auto-index-div-197') elId = 'hero-bg-1';
                    if (elId === 'auto-index-a-226') elId = 'hero-btn-1';
                    if (elId === 'auto-index-a-233') elId = 'hero-btn-2';

                    // Slide 2
                    if (elId === 'auto-index-h3-258') elId = 'hero-sub-2';
                    if (elId === 'auto-index-h2-261') elId = 'hero-title-2';
                    if (elId === 'auto-index-p-266') elId = 'hero-desc-2';
                    if (elId === 'auto-index-div-246') elId = 'hero-bg-2';
                    if (elId === 'auto-index-a-277') elId = 'hero-btn-3';
                    if (elId === 'auto-index-a-284') elId = 'hero-btn-4';

                    // Slide 3
                    if (elId === 'auto-index-h3-308') elId = 'hero-sub-3';
                    if (elId === 'auto-index-h2-309') elId = 'hero-title-3';
                    if (elId === 'auto-index-p-313') elId = 'hero-desc-3';
                    if (elId === 'auto-index-div-296') elId = 'hero-bg-3';
                    if (elId === 'auto-index-a-324') elId = 'hero-btn-5';
                    if (elId === 'auto-index-a-331') elId = 'hero-btn-6';

                    // Logo fallback
                    if (elId === 'auto-index-img-11' || elId === 'auto-index-img-92') elId = 'site-logo';
                }

                // FALLBACK: Image mapping for sub-pages
                if (elId.includes('-img-') && !document.querySelector(`[data-cms="${elId}"]`)) {
                    if (this.currentPage.startsWith('sub-')) {
                        elId = 'application-hero-img';
                    }
                }

                const el = document.querySelector(`[data-cms="${elId}"]`);
                if (el) {
                    if (data.type === 'image') {
                        if (el.tagName === 'IMG') el.src = data.value;
                        else el.style.backgroundImage = `url(${data.value})`;
                    } else {
                        // For text elements, preserve structure if it's already tagged
                        el.innerHTML = data.value;

                        // ANIMATION FIX: If the element has a data-animation (like on the Homepage),
                        // the re-render might hide it. We force it to be visible since restore is a preview.
                        if (el.hasAttribute('data-animation')) {
                            el.style.visibility = 'visible';
                            el.style.opacity = '1';
                        }
                    }
                    this.pendingChanges[elId] = data; // Queue it for saving
                    el.classList.add('cms-restoring-highlight'); // Highlight the element
                }
            }

            this.closeDashboard();
            this.showRestoreConfirmation();

            // Scroll to the first highlighted element
            const firstEl = document.querySelector('.cms-restoring-highlight');
            if (firstEl) firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (e) {
            console.error('Failed to parse snapshot', e);
            await this._showAlertAsync('Restoration Error', 'Error parsing snapshot data.');
        }
    },

    showRestoreConfirmation() {
        if (document.getElementById('cms-restore-banner')) return;
        document.body.classList.add('cms-restore-active');
        const banner = document.createElement('div');
        banner.id = 'cms-restore-banner';
        banner.innerHTML = `
            <div style="flex: 1; text-align: left;">
                <strong style="display: block; font-size: 1.1rem;">RESTORE PREVIEW ACTIVE</strong>
                <span style="font-size: 0.9rem; opacity: 0.9;">Pulsing elements show what will be changed.</span>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="cms-btn" style="background:white; color:#d11f26; font-weight: 800; padding: 10px 25px;" onclick="CMS.confirmRestore()">CONFIRM & SAVE</button>
                <button class="cms-btn" style="background: rgba(255,255,255,0.2); color:white; border: 1px solid white;" onclick="CMS.cancelRestore()">CANCEL</button>
            </div>
        `;
        document.body.appendChild(banner);
    },

    cancelRestore() {
        this.confirmAction('Revert all restored changes and reload the page?', () => {
            window.location.reload();
        });
    },

    confirmRestore() {
        const banner = document.getElementById('cms-restore-banner');
        if (banner) banner.remove();
        document.body.classList.remove('cms-restore-active');

        // Remove highlights before saving
        document.querySelectorAll('.cms-restoring-highlight').forEach(el => el.classList.remove('cms-restoring-highlight'));

        console.log('Applying restoration save...');
        this.saveAll();
    },

    triggerFileUploadForId(inputId, type = 'image') {
        const input = document.getElementById('cms-global-file-input');
        input.accept = (type === 'pdf') ? '.pdf' : 'image/*';
        input.onchange = (e) => {
            if (e.target.files.length > 0) {
                const targetInput = document.getElementById(inputId);
                const originalText = targetInput.value;
                targetInput.value = 'Uploading...';

                const folder = this.getUploadFolder(inputId);
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('folder', folder);

                this._uploadWithProgress(formData, folder)
                    .then(data => {
                        targetInput.value = data.url;
                    })
                    .catch(err => {
                        this.showAlert('Upload Failed', 'Failed to upload file: ' + err.message);
                        targetInput.value = originalText;
                    });
            }
        };
        input.click();
    },

    getUploadFolder(id) {
        if (!id) return 'OTHERS';
        const page = this.getSlug();

        if (id === 'site-logo' || id === 'footer-logo') return 'logo';
        if (id.startsWith('hero-bg') || id === 'index-cta-bg') return 'bg-image';
        if (id.startsWith('slide-') || (page === 'index' && id.includes('bg'))) return 'slides';
        if (id.startsWith('story-') || id === 'new-story-img') return 'stories';
        if (id.startsWith('res-') || id === 'new-res-img' || id === 'new-res-link') return 'Resources';
        if (id.startsWith('app-') || id === 'new-app-img' || page.startsWith('sub-')) return 'applications';
        if (id.startsWith('sol-') || id.startsWith('feat-') || id === 'new-sol-img' || page.startsWith('product-detail')) return 'products';
        if (id.startsWith('blog-')) return 'blog';
        if (id.startsWith('client-logo') || id.startsWith('partner-')) return 'partners';
        if (id.startsWith('market-')) return 'markets';

        // Handle auto-tagged elements gracefully based on the page context
        if (id.startsWith('auto-')) {
            if (page.startsWith('solution') || page.startsWith('product-detail')) return 'products';
            if (page.startsWith('sub-') || page.startsWith('app')) return 'applications';
            if (page.includes('story') || page.includes('stories')) return 'stories';
            if (page.includes('res') || page.includes('blog') || page.includes('webinar')) return 'Resources';
        }

        return 'OTHERS';
    },

    // -- Upload Progress Overlay --
    _showUploadProgress(percent) {
        let overlay = document.getElementById('cms-upload-progress-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'cms-upload-progress-overlay';
            overlay.innerHTML = `
                <div id="cms-upload-progress-box">
                    <div id="cms-upload-progress-icon"><i class="fa fa-cloud-upload"></i></div>
                    <div id="cms-upload-progress-label">Uploading Image...</div>
                    <div id="cms-upload-progress-bar-wrap">
                        <div id="cms-upload-progress-bar"></div>
                    </div>
                    <div id="cms-upload-progress-percent">0%</div>
                </div>
            `;
            // Inject CSS once
            if (!document.getElementById('cms-upload-progress-style')) {
                const style = document.createElement('style');
                style.id = 'cms-upload-progress-style';
                style.textContent = `
                    #cms-upload-progress-overlay {
                        position: fixed; inset: 0; z-index: 9999999;
                        background: rgba(0,0,0,0.55); backdrop-filter: blur(3px);
                        display: flex; align-items: center; justify-content: center;
                    }
                    #cms-upload-progress-box {
                        background: #1a1a2e; border-radius: 16px;
                        padding: 36px 44px; min-width: 300px; text-align: center;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                        border: 1px solid rgba(255,255,255,0.08);
                        animation: cms-upload-fadein 0.2s ease;
                    }
                    @keyframes cms-upload-fadein {
                        from { opacity: 0; transform: scale(0.92); }
                        to   { opacity: 1; transform: scale(1); }
                    }
                    #cms-upload-progress-icon {
                        font-size: 40px; color: #d11f26; margin-bottom: 12px;
                        animation: cms-upload-pulse 1.2s ease-in-out infinite;
                    }
                    @keyframes cms-upload-pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50%       { transform: scale(1.15); opacity: 0.7; }
                    }
                    #cms-upload-progress-label {
                        color: #fff; font-size: 15px; font-weight: 600;
                        margin-bottom: 18px; letter-spacing: 0.5px;
                    }
                    #cms-upload-progress-bar-wrap {
                        background: rgba(255,255,255,0.1); border-radius: 100px;
                        height: 10px; overflow: hidden; margin-bottom: 10px;
                    }
                    #cms-upload-progress-bar {
                        height: 100%; width: 0%; border-radius: 100px;
                        background: linear-gradient(90deg, #d11f26, #ff6b6b);
                        transition: width 0.25s ease;
                    }
                    #cms-upload-progress-percent {
                        color: #ff6b6b; font-size: 22px; font-weight: 800;
                        letter-spacing: 1px;
                    }
                `;
                document.head.appendChild(style);
            }
            document.body.appendChild(overlay);
        }
        overlay.style.display = 'flex';
        document.getElementById('cms-upload-progress-bar').style.width = percent + '%';
        document.getElementById('cms-upload-progress-percent').textContent = Math.round(percent) + '%';
    },

    _hideUploadProgress() {
        const overlay = document.getElementById('cms-upload-progress-overlay');
        if (overlay) {
            // Show 100% briefly before hiding
            document.getElementById('cms-upload-progress-bar').style.width = '100%';
            document.getElementById('cms-upload-progress-percent').textContent = '100%';
            setTimeout(() => { overlay.style.display = 'none'; }, 500);
        }
    },

    _uploadWithProgress(formData, folder) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `/api/upload?folder=${encodeURIComponent(folder)}`);
            xhr.withCredentials = true;

            // Simulate smooth progress from 0% ? 90% while waiting for server
            // Real XHR progress on localhost is instant; server-side SFTP takes time
            let simulatedPct = 0;
            this._showUploadProgress(0);

            const simulateInterval = setInterval(() => {
                // Slow down as we approach 90% ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â never reaches 100% until server responds
                const remaining = 90 - simulatedPct;
                const step = Math.max(0.4, remaining * 0.045);
                simulatedPct = Math.min(90, simulatedPct + step);
                this._showUploadProgress(simulatedPct);
            }, 120);

            xhr.addEventListener('load', () => {
                clearInterval(simulateInterval);
                this._hideUploadProgress();
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        reject(new Error('Invalid response from server'));
                    }
                } else {
                    reject(new Error(xhr.responseText || 'Upload failed with status ' + xhr.status));
                }
            });

            xhr.addEventListener('error', () => {
                clearInterval(simulateInterval);
                this._hideUploadProgress();
                reject(new Error('Network error during upload'));
            });

            xhr.addEventListener('abort', () => {
                clearInterval(simulateInterval);
                this._hideUploadProgress();
                reject(new Error('Upload aborted'));
            });

            xhr.send(formData);
        });
    },

    triggerImageUpload() {
        const input = document.getElementById('cms-global-file-input');
        input.accept = 'image/*';
        input.onchange = async (e) => {
            if (e.target.files.length > 0) {
                const id = this.activeImageElement ? this.activeImageElement.getAttribute('data-cms') : 'fallback';
                const folder = this.getUploadFolder(id);

                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('folder', folder);

                try {
                    const data = await this._uploadWithProgress(formData, folder);
                    this.updateActiveImage(data.url);
                    document.getElementById('cms-image-picker-modal').style.display = 'none';
                } catch (err) {
                    await this._showAlertAsync('Upload Error', 'Upload failed: ' + err.message);
                }
            }
        };
        input.click();
    },

    triggerMediaLibraryUpload() {
        const input = document.getElementById('cms-global-file-input');
        input.accept = 'image/*,video/*,.pdf';
        input.onchange = async (e) => {
            if (e.target.files.length > 0) {
                const folder = 'OTHERS';
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('folder', folder);

                try {
                    const data = await this._uploadWithProgress(formData, folder);
                    
                    // Save to recent uploads in localStorage
                    try {
                        const recent = JSON.parse(localStorage.getItem('cms_recent_uploads') || '[]');
                        recent.unshift(data.url);
                        localStorage.setItem('cms_recent_uploads', JSON.stringify(recent.slice(0, 100))); // keep top 100
                    } catch(e) {}

                    await this._showAlertAsync('Upload Successful', 'File uploaded successfully! You can find it at:\\n' + data.url);
                    // Add it to the media library grid directly
                    const grid = document.querySelector('.cms-tab-scroll[style*="grid-template-columns"]');
                    if (grid) {
                        grid.insertAdjacentHTML('afterbegin', `<img src="${data.url}" style="width:100%; height:120px; object-fit:cover; border-radius:6px; border:1px solid #ddd; cursor:pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="CMS.showMediaPreview('${data.url}')">`);
                    }
                } catch (err) {
                    await this._showAlertAsync('Upload Error', 'Upload failed: ' + err.message);
                }
            }
        };
        input.click();
    },

    async saveAll() {
        // Before saving, update the structural layout element
        const layout = this.getLayoutJSON();
        this.updateElement('PAGE_LAYOUT', 'layout', JSON.stringify(layout));

        // -- SAVE PRODUCT DETAILS & DOWNLOADS (V2 Relational) --
        // Note: Product Details and Downloads are now fully read-only on the DOM side.
        // They are driven globally by the 'resources' table and managed via the 'Resources' tab.

        const keys = Object.keys(this.pendingChanges);

        if (keys.length === 0) {
            this.showStatus('No pending changes.', 'info');
            return;
        }

        this.isSaving = true; // Set flag to allow reload without browser warning
        const saveBtn = document.getElementById('saveContent');
        const originalHTML = saveBtn ? saveBtn.innerHTML : '';
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<span class="cms-spinner"></span> Saving...';
        }

        this.showStatus('Saving changes...', 'info');

        // -- PROTECTED FIELDS --
        // sol-\d+-title and app-\d+-title elements use inner <span> for styling (e.g., <span>GEO</span>GRID)
        // and must not be overwritten with plain DB text on load. feat-\d+-title are editable on index page.
        const HTML_SPAN_PROTECTED = /^sol-\d+-title$|^app-\d+-title$/;
        
        // Create an array of promises for all changes
        const savePromises = keys.map(async (element_id) => {
            if (HTML_SPAN_PROTECTED.test(element_id)) return null;
            
            const change = this.pendingChanges[element_id];
            const el = document.querySelector(`[data-cms="${element_id}"]`);
            let url = '/api/v2/page-elements';
            let method = 'POST';
            
            let cleanValue = change.value;
            if (change.type === 'text' && typeof cleanValue === 'string') {
                // Remove contenteditable, outlines, borders, and other edit-mode artifacts
                cleanValue = cleanValue.replace(/\s*contenteditable=(['"])true\1/gi, '');
                
                // NEW: Strip out CMS-specific inline styles to prevent them from being saved
                cleanValue = cleanValue.replace(/\s*style=(["'])(.*?)\1/gi, (match, quote, styleContent) => {
                    let cleaned = styleContent
                        .replace(/outline:\s*2px\s*dashed\s*(#00b05b|rgb\(0,\s*176,\s*91\));?/gi, '')
                        .replace(/cursor:\s*pointer;?/gi, '')
                        .replace(/display:\s*inline-block;?/gi, '')
                        .replace(/padding:\s*2px;?/gi, '');
                    cleaned = cleaned.trim();
                    return cleaned === '' ? '' : ` style=${quote}${cleaned}${quote}`;
                });
                
                cleanValue = cleanValue.replace(/\s*class=(['"])[^'"]*dashed[^'"]*\1/gi, '').trim();
            }

            // Global content keys must always save to 'index' page so they load on all pages
            const globalContentKeys = [
                'header-email', 'header-address', 'header-facebook-link', 'header-linkedin-link',
                'footer-address', 'footer-phone-1', 'footer-phone-2', 'footer-email', 'footer-tagline',
                'footer-facebook-link', 'footer-linkedin-link', 'footer-baba-logo', 'footer-iso-logo',
                'site-logo', 'footer-logo', 'header-enquiry', 'header-credit-text', 'header-credit-link',
                'client-logo-1', 'client-logo-2', 'client-logo-3', 'client-logo-4', 'client-logo-5', 'client-logo-6',
                'client-logo-1-link', 'client-logo-2-link', 'client-logo-3-link', 'client-logo-4-link', 'client-logo-5-link', 'client-logo-6-link',
                'bpro-global-logo', 'bpro-global-device', 'bpro-global-heading'
            ];
            const saveSlug = globalContentKeys.includes(element_id) ? 'index' : this.currentPage;

            let body = {
                page_slug: saveSlug,
                element_key: element_id,
                content_type: change.type,
                content_value: cleanValue
            };

            // -- Routing Logic --
            const solCard = el ? el.closest('[data-sol-id]') : null;
            let solId = solCard ? solCard.dataset.solId : null;
            
            if (!solId && element_id.startsWith('sol-')) {
                const parts = element_id.split('-');
                // Check if the second part is a UUID or a ID
                solId = parts[1];
            }
            
            if (!solId && this.currentPage.startsWith('solution-')) {
                if (this.activeSolution) solId = this.activeSolution.id;
            }

            if (solId && (solId !== 'main' && solId !== 'grid')) {
                const isSolutionField = element_id.startsWith('sol-') || element_id.startsWith('feat-');
                if (isSolutionField) {
                    const field = element_id.includes('-title') ? 'title' : 
                                 element_id.includes('-desc') ? 'short_description' :
                                 element_id.includes('-img') ? 'icon_image_url' : null;
                    if (field) {
                        url = `/api/v2/solutions/${solId}`;
                        method = 'PATCH';
                        body = { [field]: cleanValue };
                    } else {
                        // Fallback to page_elements for everything else
                        url = `/api/v2/page-elements`;
                        method = 'POST';
                        body = { "page_slug": this.currentPage, "element_id": element_id, "content_type": change.type, "content_value": cleanValue };
                    }
                }
            }
            else if (el && el.closest('[data-app-id]')) {
                // Only route to applications API when the element is inside a [data-app-id] container.
                // Static index-page elements like app-title, app-header, app-desc start with 'app-'
                // but have no [data-app-id] ancestor ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â they must go to page_elements, not here.
                const closestApp = el.closest('[data-app-id]');
                const appId = closestApp.dataset.appId;
                const field = (element_id.includes('-title') || element_id.includes('-name')) ? 'title' : null;
                if (field && appId) {
                    url = `/api/v2/applications/${appId}`;
                    method = 'PATCH';
                    body = { [field]: cleanValue };
                } else {
                    url = `/api/v2/page-elements`;
                    method = 'POST';
                    body = { "page_slug": this.currentPage, "element_id": element_id, "content_type": change.type, "content_value": cleanValue };
                }
            }
            else if ((el && el.closest('[data-story-id]')) || element_id.startsWith('story-')) {
                // Try to find Story ID from multiple sources
                let storyId = (el && el.closest('[data-story-id]')) ? el.closest('[data-story-id]').dataset.storyId : null;
                
                if (!storyId && element_id.startsWith('story-')) {
                    const parts = element_id.split('-');
                    storyId = parts.find(p => p.length === 36); // Match UUID pattern
                }
                
                if (!storyId && this.activeStory) storyId = this.activeStory.id;
                
                // NEW: Even if not in state, if on case-study page, we MUST find the ID
                if (!storyId && this.currentPage.startsWith('case-study-')) {
                    const storyEl = document.querySelector('[data-story-id]');
                    if (storyEl) storyId = storyEl.dataset.storyId;
                }

                if (storyId) {
                    const isStoryCoreField = element_id.startsWith('story-');
                    
                    if (isStoryCoreField) {
                        url = `/api/v2/stories/${storyId}`;
                        method = 'PATCH';
                        
                        // Map data-cms keys to DB Columns
                        let field = null;
                        if (element_id === 'story-title' || element_id.endsWith('-title')) field = 'title';
                        else if (element_id === 'story-hero-image' || element_id.endsWith('-img')) field = 'hero_image_url';
                        else if (element_id === 'story-challenge-body' || element_id.endsWith('-desc')) field = 'challenge_text';
                        else if (element_id === 'story-solution-body') field = 'solution_text';
                        else if (element_id === 'story-location') field = 'location';
                        else if (element_id === 'story-products') field = 'products_used';
                        else if (element_id === 'story-application') field = 'application';
                        else if (element_id === 'story-benefits') field = 'project_benefits';

                        if (field) {
                            body = { [field]: cleanValue };
                        } else {
                            // Fallback to page_elements if not a main column
                            url = `/api/v2/page-elements`;
                            method = 'POST';
                            body = { "page_slug": this.currentPage, "element_id": element_id, "content_type": change.type, "content_value": cleanValue };
                        }
                    } else {
                        // All other internal content blocks use the single page_elements table
                        url = `/api/v2/page-elements`;
                        method = 'POST';
                        body = { 
                            "page_slug": this.currentPage, 
                            "element_id": element_id, 
                            "content_type": change.type, 
                            "content_value": cleanValue 
                        };
                    }
                }
            }
            else if ((el && el.closest('[data-res-id]')) || element_id.startsWith('res-') || element_id.startsWith('v2res-')) {
                const resEl = el ? el.closest('[data-res-id]') : null;
                const resId = (resEl ? resEl.dataset.resId : null) || (element_id.includes('-') ? element_id.split('-')[1] : null);
                
                let field = null;
                if (element_id.endsWith('-img') || element_id === 'blog-hero-image') field = 'thumbnail_url';
                else if (element_id.endsWith('-title') || element_id === 'blog-title') field = 'title';
                else if (element_id.endsWith('-desc') || element_id === 'blog-description') field = 'description';

                if (field && resId) {
                    url = `/api/v2/resources/${resId}`;
                    method = 'PATCH';
                    body = { [field]: cleanValue };
                } else {
                    url = `/api/v2/page-elements`;
                    method = 'POST';
                    body = { "page_slug": this.currentPage, "element_id": element_id, "content_type": change.type, "content_value": cleanValue };
                }
            }
            else if (element_id.startsWith('feat-')) {
                const solEl = el ? el.closest('[data-sol-id]') : null;
                const solId = (solEl ? solEl.dataset.solId : null) || (element_id.includes('-') ? element_id.split('-')[1] : null);
                const field = (element_id === 'hero-title') ? 'title' :
                              (element_id === 'hero-desc') ? 'short_description' :
                              (element_id === 'product-thumb-1') ? 'icon_image_url' : null;
                if (field && solId) {
                    url = `/api/v2/solutions/${solId}`;
                    method = 'PATCH';
                    body = { [field]: cleanValue };
                } else {
                    url = `/api/v2/page-elements`;
                    method = 'POST';
                    body = { "page_slug": this.currentPage, "element_id": element_id, "content_type": change.type, "content_value": cleanValue };
                }
            }
            else {
                // -- DEFAULT: General page-element keys (e.g., header-enquiry, footer-*, misc text) --
                url = `/api/v2/page-elements`;
                method = 'POST';
                body = {
                    page_slug: saveSlug,
                    element_id: element_id,
                    content_type: change.type,
                    content_value: cleanValue
                };
            }

            console.log(`[CMS] Saving ${element_id} to ${url} via ${method}...`);
            
            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(body)
                });
                if (!res.ok) throw new Error(`Save failed for ${element_id}`);
                return true;
            } catch (err) {
                console.error(`[CMS] Save error for ${element_id}:`, err);
                return false;
            }
        });

        const results = await Promise.all(savePromises);
        const successCount = results.filter(r => r === true).length;

        if (successCount > 0) {
            this.showStatus(`Successfully saved ${successCount} changes!`, 'success');
            this.pendingChanges = {};

            // Snapshot history
            try {
                const snapshot = {};
                document.querySelectorAll('[data-cms]').forEach(el => {
                    const elId = el.getAttribute('data-cms');
                    const bg = window.getComputedStyle(el).backgroundImage;
                    const isImg = el.tagName === 'IMG' || (bg !== 'none' && bg.includes('url'));
                    const val = isImg ? (el.tagName === 'IMG' ? el.src : bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')) : el.innerHTML.trim();
                    snapshot[elId] = { type: isImg ? 'image' : 'text', value: val };
                });
                await fetch(`/api/v2/history`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ page_slug: this.currentPage, snapshot })
                });
            } catch (e) { }

            setTimeout(() => this.refreshWithState(), 1200);
        } else {
            this.showStatus('Save failed. Check console for details.', 'error');
        }
    },


    async syncCurrentPageToDB() {
        if (!await this._showConfirmAsync('Sync Page', 'This will copy all hardcoded text from the current page into the database. Existing CMS values for these elements will be overwritten. Proceed?')) return;

        const elements = document.querySelectorAll('[data-cms]');
        let count = 0;
        for (const el of elements) {
            const id = el.getAttribute('data-cms');
            if (id === 'PAGE_LAYOUT') continue;

            const bg = window.getComputedStyle(el).backgroundImage;
            const isImg = el.tagName === 'IMG' || (bg !== 'none' && bg.includes('url'));
            const type = isImg ? 'image' : 'text';
            let value = '';

            if (isImg) {
                value = el.tagName === 'IMG' ? el.src : bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            } else {
                value = el.innerHTML.trim().replace(/contenteditable="[^"]*"/g, '').replace(/data-cms="[^"]*"/g, '');
            }

            try {
                await fetch(`/api/content/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        page: this.currentPage,
                        element_id: id,
                        content_type: type,
                        content_value: value
                    })
                });
                count++;
            } catch (e) { }
        }
        this.showStatus(`Synchronized ${count} elements to database! Refreshing...`, 'success');
        setTimeout(() => window.location.reload(), 1500);
    },

    generateChangesSummary() {
        const sectionsChanged = new Set();
        let changedImgs = 0;
        let changedTexts = 0;
        let structuralChanges = false;

        for (const [id, change] of Object.entries(this.pendingChanges)) {
            if (id === 'PAGE_LAYOUT') {
                structuralChanges = true;
                continue;
            }

            let area = 'Body Content';
            if (id.includes('hero')) area = 'Hero Section';
            else if (id.includes('feat')) area = 'Solutions';
            else if (id.includes('app')) area = 'Applications';
            else if (id.includes('post')) area = 'Resources';
            else if (id.includes('footer')) area = 'Footer';
            else if (id.includes('client')) area = 'Partners';

            sectionsChanged.add(area);
            if (change.type === 'image') changedImgs++;
            else changedTexts++;
        }

        const areasList = Array.from(sectionsChanged).join(', ');
        let summaryText = '';
        if (changedTexts > 0) summaryText += `${changedTexts} text element(s) `;
        if (changedImgs > 0) summaryText += (changedTexts > 0 ? 'and ' : '') + `${changedImgs} image(s) `;

        let final = summaryText ? `${summaryText}modified in ${areasList}.` : 'General layout snapshot saved.';
        if (structuralChanges) final = "Structural updates (Add/Delete/Reorder) and " + final.charAt(0).toLowerCase() + final.slice(1);

        return final;
    },

    getLayoutJSON() {
        const getIds = (selector, prefix) => {
            return Array.from(document.querySelectorAll(`${selector} [data-cms^="${prefix}-"]`))
                .map(el => el.getAttribute('data-cms').split('-')[1]);
        };

        const layout = {
            solutions: getIds('.services-section .row', 'feat'),
            apps: getIds('.application-slider .slick_slider', 'app'),
            posts: getIds('.blog-section .slick_slider', 'post'),
            stories: getIds('.product-section .row', 'story'),
            resources: getIds('.product-section .row', 'res')
        };

        // Page specific refinements
        if (this.currentPage === 'resources' || this.currentPage === 'resources-page') {
            layout.techDocs = getIds('#grid-docs', 'res');
            layout.blogs = getIds('#grid-blog', 'res');
            layout.webinars = getIds('#grid-webinar', 'res');
            layout.downloads = getIds('#grid-downloads', 'res');
            layout.videos = getIds('#grid-videos', 'res');
            layout.guides = getIds('#grid-guides', 'res');
            layout.events = getIds('#grid-events', 'res');
        }

        return layout;
    },

    _imageClickListener(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const img = e.currentTarget;
        const idAttr = img.getAttribute('data-cms');
        CMS.activeImageElement = img;

        const parentLink = img.closest('a');
        const currentLink = parentLink ? parentLink.getAttribute('href') : '';

        // Unified Image & Link Editor Modal
        const existing = document.getElementById('cms-image-link-editor-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'cms-image-link-editor-modal';
        modal.className = 'cms-modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div style="background:#fff; border-radius:12px; padding:30px; width:450px; max-width:95vw; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h3 style="margin:0; font-size:1.1rem; color:#333;"><i class="fa fa-picture-o" style="color:#d11f26; margin-right:8px;"></i>Edit Image & Link</h3>
                    <i class="fa fa-times" style="cursor:pointer; font-size:1.2rem; color:#999;" onclick="document.getElementById('cms-image-link-editor-modal').remove()"></i>
                </div>
                
                <div style="text-align:center; margin-bottom:20px; background:#f9f9f9; padding:15px; border-radius:8px;">
                    <img id="cms-editor-preview" src="${img.tagName === 'IMG' ? img.src : (window.getComputedStyle(img).backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, ''))}" 
                        style="max-width:100%; max-height:150px; border-radius:4px; border:1px solid #ddd;">
                    <div style="margin-top:10px;">
                        <button onclick="CMS.openImagePicker()" style="padding:8px 15px; background:#d11f26; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:0.8rem; font-weight:700;">CHANGE IMAGE</button>
                    </div>
                </div>

                <label style="display:block; font-size:0.75rem; font-weight:700; color:#666; margin-bottom:6px; text-transform:uppercase;">Link URL (Optional)</label>
                <input id="cms-image-link-input" type="text" value="${currentLink}" 
                    style="width:100%; padding:10px 12px; border:2px solid #eee; border-radius:6px; font-size:0.9rem; outline:none; margin-bottom:20px; color:#333;"
                    placeholder="e.g. https://... or page.html">

                <div style="display:flex; gap:10px; justify-content:flex-end;">
                    <button onclick="document.getElementById('cms-image-link-editor-modal').remove()" style="padding:10px 20px; border:1px solid #ddd; background:#fff; border-radius:6px; cursor:pointer; font-size:0.9rem; color:#333;">Cancel</button>
                    <button id="cms-image-link-save-btn" style="padding:10px 25px; background:#28a745; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:0.9rem; font-weight:700;"><i class="fa fa-check"></i> APPLY CHANGES</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('cms-image-link-save-btn').onclick = () => {
            const newLink = document.getElementById('cms-image-link-input').value.trim() || '#';
            const currentImgSrc = document.getElementById('cms-editor-preview').src;
            
            CMS.updateActiveImage(currentImgSrc, newLink);
            modal.remove();
        };

        // Close on backdrop
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    },

    // Link Editor Logic
    // Redundant link editor logic removed (replaced by newer openLinkEditor at line 3428)


    togglePreview(forceMode = null) {
        const btn = document.getElementById('btn-cms-preview');
        if (!btn) return;

        if (forceMode !== null) {
            this.isEditing = forceMode;
        } else {
            this.isEditing = !this.isEditing;
        }

        const isEditMode = document.body.classList.toggle('cms-edit-mode', this.isEditing);
        const indicator = document.getElementById('cms-mode-indicator');

        if (isEditMode) {
            this.tagElements(); // FORCE RE-TAG to catch anything missed (like hidden tabs)
            this.initProductDetailEditor(); // Activate add/remove row controls on product pages

            // SPECIAL: Add listeners to any Tab buttons to re-apply edit handlers if hidden content becomes visible
            // This ensures hidden tabs become editable when clicked
            document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
                if (!tab.hasCmsListener) {
                    tab.addEventListener('shown.bs.tab', () => {
                        console.log('[CMS] Tab switched, updating edit handlers...');
                        this.tagElements();
                        this.togglePreview(true); // RE-APPLY in Edit mode (idempotent)
                    });
                    tab.hasCmsListener = true;
                }
            });

            btn.innerHTML = '<i class="fa fa-eye"></i> SWITCH TO PREVIEW';
            btn.classList.remove('cms-btn-reset');
            btn.classList.add('cms-btn-preview');
            if (indicator) {
                indicator.innerHTML = 'EDIT MODE ACTIVE';
                indicator.classList.remove('preview-mode');
            }
            
            // Pause auto-sliding sliders during edit mode
            if (window.$ && window.$('.slick-initialized').length) {
                window.$('.slick-initialized').slick('slickPause');
            }
        } else {
            btn.innerHTML = '<i class="fa fa-pencil"></i> SWITCH TO EDIT';
            btn.classList.remove('cms-btn-preview');
            btn.classList.add('cms-btn-reset');
            if (indicator) {
                indicator.innerHTML = 'PREVIEW MODE ACTIVE';
                indicator.classList.add('preview-mode');
            }
            
            // Resume auto-sliding sliders in preview mode
            if (window.$ && window.$('.slick-initialized').length) {
                window.$('.slick-initialized').slick('slickPlay');
            }
            if (this.dashboardModal) this.dashboardModal.style.display = 'none';
        }

        // Ensure product detail/downloads tools disable when switching to preview
        this.initProductDetailEditor();

        const editableElements = Array.from(document.querySelectorAll('[data-cms]'))
            .filter(el => {
                const skip = el.closest('.cms-modal') || el.closest('#cms-admin-bar') || el.closest('#cms-dashboard-modal') || el.closest('#applicationTabs') || el.hasAttribute('cms-no-tag') || el.closest('[cms-no-tag]') || el.getAttribute('data-cms') === 'no-edit';
                return !skip;
            });

        console.log(`[CMS] Initializing ${editableElements.length} editable elements`);

        editableElements.forEach(el => {
            const bg = window.getComputedStyle(el).backgroundImage;
            const isImg = el.tagName === 'IMG';
            const isBg = (bg !== 'none' && bg !== '' && bg.includes('url'));
            const isText = !(isImg || isBg);

            if (isText) {
                // DON'T set contentEditable for <a> tags to avoid click interference
                // Link editing is handled by Global Event Delegation
                if (el.tagName !== 'A') {
                    el.contentEditable = this.isEditing ? 'true' : 'false';
                    if (this.isEditing) {
                        const elId = el.getAttribute('data-cms');
                        const isFeatTitle = /^feat-\d+-title$/.test(elId);

                        el.oninput = () => {
                            if (isFeatTitle) {
                                // For feat titles: only save plain text during typing
                                // (DO NOT call _applyTitleFormatting here ÃƒÂ¢Ã¢&rdquo;šÂ¬Ã¢â‚¬Â it resets innerHTML and causes RTL cursor)
                                const plainText = el.innerText.trim();
                                CMS.pendingChanges[elId] = { type: 'text', value: plainText, page_slug: CMS.currentPage };
                            } else {
                                CMS.updateElement(elId, 'text', el.innerHTML.trim());
                            }
                        };

                        if (isFeatTitle) {
                            // Apply red/black span formatting ONLY after the user finishes typing (blur)
                            el.onblur = () => {
                                const plainText = el.innerText.trim();
                                CMS._applyTitleFormatting(el, plainText);
                                CMS.pendingChanges[elId] = { type: 'text', value: plainText, page_slug: CMS.currentPage };
                            };
                        } else {
                            el.onblur = null;
                        }
                        // Prevent click propagation to avoid triggering accordions/links while editing
                        el.onclick = (e) => {
                            if (this.isEditing) {
                                e.stopPropagation();
                            }
                        };
                    } else {
                        el.oninput = null;
                        el.onclick = null;
                    }
                } else {
                    el.contentEditable = 'false';
                }

                if (this.isEditing) {
                    if (el.tagName === 'A') {
                        el.style.outline = '2px dashed #00b05b'; // GREEN for links
                        el.style.display = 'inline-block';
                        el.style.padding = '2px';
                    }
                } else {
                    if (el.tagName === 'A') {
                        el.style.outline = '';
                        el.style.display = '';
                        el.style.padding = '';
                    }
                }
            } else {
                if (this.isEditing) {
                    el.style.outline = '2px dashed #00b05b';
                    el.style.cursor = 'pointer';
                    el.addEventListener('click', CMS._imageClickListener);
                } else {
                    el.style.outline = '';
                    el.style.cursor = '';
                    el.removeEventListener('click', CMS._imageClickListener);
                }
            }
        });
        this.initPremiumDownloadCards();
    },

    openLinkEditor(linkEl) {
        const currentHref = linkEl.getAttribute('href') || '';
        const cmsKey = linkEl.getAttribute('data-cms') || '';
        const isLinkOnly = linkEl.hasAttribute('data-link-only');
        
        // Find if there is a child title element that is editable
        const childTitleEl = linkEl.querySelector('[data-cms*="-title-"]') || linkEl.querySelector('[data-cms$="-title"]');
        const canEditLabel = !isLinkOnly || !!childTitleEl;

        let label = '';
        if (childTitleEl) {
            label = childTitleEl.innerText.trim();
        } else {
            label = isLinkOnly ? (linkEl.querySelector('h5, h4, h3, h2, h1, p') || linkEl).innerText.trim() || 'Link'
                                 : (linkEl.innerText.trim() || 'Link');
        }

        // HTML-escape to prevent special characters (e.g. "&" in "Walls, & Slopes")
        // from breaking the modal's HTML template literal attribute values.
        const escHtml = (str) => str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeLabel = escHtml(label);
        const safeHref = escHtml(currentHref);

        // Remove any existing link editor modal
        const existing = document.getElementById('cms-link-editor-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'cms-link-editor-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 99999;
            display: flex; align-items: center; justify-content: center;
        `;
        modal.innerHTML = `
            <div style="background:#fff; border-radius:8px; padding:30px; width:480px; max-width:95vw; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h3 style="margin:0; font-size:1.1rem; color:#333;"><i class="fa fa-link" style="color:#d11f26; margin-right:8px;"></i>Edit Link Button</h3>
                    <i class="fa fa-times" style="cursor:pointer; font-size:1.2rem; color:#999;" onclick="document.getElementById('cms-link-editor-modal').remove()"></i>
                </div>

                <label style="display:block; font-size:0.8rem; font-weight:700; color:#666; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">${canEditLabel ? 'Title / Label' : 'Card Title (read-only)'}</label>
                <input id="cms-link-label-input" type="text" value="${safeLabel}"
                    style="width:100%; padding:10px 12px; border:2px solid #eee; border-radius:6px; font-size:0.9rem; outline:none; margin-bottom:15px; color:#333; background:${canEditLabel ? '#fff' : '#f5f5f5'};"
                    placeholder="e.g. Read More"
                    ${canEditLabel ? '' : 'readonly'}
                    onfocus="this.style.borderColor='#d11f26'" onblur="this.style.borderColor='#eee'">

                <label style="display:block; font-size:0.8rem; font-weight:700; color:#666; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Link URL</label>
                <div style="margin-bottom:8px;">
                    <input id="cms-link-url-input" type="text" value="${safeHref}"
                        style="width:100%; padding:10px 12px; border:2px solid #eee; border-radius:6px; font-size:0.9rem; outline:none; color:#333; background:#fff; box-sizing:border-box;"
                        placeholder="e.g. contact.html or https://..."
                        onfocus="this.style.borderColor='#d11f26'" onblur="this.style.borderColor='#eee'">
                </div>
                <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
                    <button id="cms-link-upload-btn" onclick="CMS.triggerLinkFileUpload()" style="background:#f5f5f5; border:2px solid #eee; border-radius:6px; padding:8px 15px; cursor:pointer; color:#333;" title="Upload PDF or Link File">
                        <i class="fa fa-upload"></i> Upload File
                    </button>
                </div>
                ${!isLinkOnly ? `
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px;">
                    <button onclick="document.getElementById('cms-link-url-input').value='contact.html'" style="background:#f9f9f9; border:1px solid #ddd; padding:4px 10px; border-radius:4px; font-size:0.75rem; cursor:pointer; color:#555;">contact.html</button>
                    <button onclick="document.getElementById('cms-link-url-input').value='solutions.html'" style="background:#f9f9f9; border:1px solid #ddd; padding:4px 10px; border-radius:4px; font-size:0.75rem; cursor:pointer; color:#555;">solutions.html</button>
                    <button onclick="document.getElementById('cms-link-url-input').value='resources.html'" style="background:#f9f9f9; border:1px solid #ddd; padding:4px 10px; border-radius:4px; font-size:0.75rem; cursor:pointer; color:#555;">resources.html</button>
                </div>
                ` : '<div style="margin-bottom:12px;"></div>'}
                <div style="display:flex; gap:10px; justify-content:flex-end;">
                    <button onclick="document.getElementById('cms-link-editor-modal').remove()" style="padding:10px 20px; border:1px solid #ddd; background:#fff; border-radius:6px; cursor:pointer; font-size:0.9rem; color:#333;">Cancel</button>
                    <button id="cms-link-save-btn" style="padding:10px 25px; background:#d11f26; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:0.9rem; font-weight:700;"><i class="fa fa-save"></i> SAVE CHANGES</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Stop mousedown/mouseup/click on inner content from bubbling to backdrop
        const innerBox = modal.querySelector('div');
        if (innerBox) {
            innerBox.addEventListener('mousedown', e => e.stopPropagation());
            innerBox.addEventListener('mouseup', e => e.stopPropagation());
            innerBox.addEventListener('click', e => e.stopPropagation());
        }

        // Close only when clicking directly on the backdrop (not inner content)
        // Bulletproof logic to prevent closing when dragging to select text
        let isMouseDownOnBackdrop = false;
        modal.addEventListener('mousedown', (e) => {
            if (e.target === modal) isMouseDownOnBackdrop = true;
            else isMouseDownOnBackdrop = false;
        });
        modal.addEventListener('mouseup', (e) => {
            if (isMouseDownOnBackdrop && e.target === modal) {
                modal.remove();
            }
            isMouseDownOnBackdrop = false;
        });

        // Focus label input
        const labelInput = document.getElementById('cms-link-label-input');
        labelInput.focus();
        labelInput.setSelectionRange(0, labelInput.value.length);

        // Save button
        document.getElementById('cms-link-save-btn').onclick = () => {
            const newLabel = labelInput.value.trim();
            const newUrl = document.getElementById('cms-link-url-input').value.trim();
            if (!newLabel || !newUrl) return;

            if (isLinkOnly) {
                // For complex card wrappers (e.g. application cards): only update href,
                // never touch innerHTML. Save just the URL as content_value.
                linkEl.setAttribute('href', newUrl);
                if (cmsKey) {
                    this.updateElement(cmsKey, 'text', newUrl);
                }
                
                // ALSO, update the child title text and its database entry
                if (childTitleEl && newLabel) {
                    childTitleEl.innerText = newLabel;
                    const childTitleCmsKey = childTitleEl.getAttribute('data-cms');
                    if (childTitleCmsKey) {
                        this.updateElement(childTitleCmsKey, 'text', newLabel);
                    }
                }
            } else {
                // Standard button/link: update label text and href, save outerHTML
                const icon = linkEl.querySelector('i, span[class*="ti-"], span.fa, svg');
                if (icon) {
                    linkEl.innerHTML = `${icon.outerHTML} ${newLabel}`;
                } else {
                    linkEl.innerText = newLabel;
                }
                linkEl.setAttribute('href', newUrl);
                if (cmsKey) {
                    this.updateElement(cmsKey, 'text', linkEl.outerHTML);
                }
            }

            this.showAlert('Success', 'Link updated successfully!');
            modal.remove();
        };

        // Backdrop click logic is handled above

        // Enter key saves
        [labelInput, document.getElementById('cms-link-url-input')].forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') document.getElementById('cms-link-save-btn').click();
                if (e.key === 'Escape') modal.remove();
            });
        });
    },

    triggerLinkFileUpload() {
        const input = document.getElementById('cms-global-file-input');
        input.accept = '.pdf, .zip, .doc, .docx, image/*';
        input.onchange = async (e) => {
            if (e.target.files.length > 0) {
                const folder = 'files'; // Attached files usually go to central files folder
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('folder', folder);

                try {
                    const btn = document.getElementById('cms-link-upload-btn');
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fa fa-spinner fa-spin';

                    const response = await fetch(`/api/upload?folder=${encodeURIComponent(folder)}`, {
                        method: 'POST',
                        body: formData,
                        credentials: 'include'
                    });
                    if (!response.ok) throw new Error(await response.text());
                    const data = await response.json();
                    const urlInput = document.getElementById('cms-link-url-input');
                    if (urlInput) urlInput.value = data.url;
                    if (icon) icon.className = 'fa fa-upload';
                    this.showStatus('File uploaded successfully!', 'info');
                } catch (err) {
                    await this._showAlertAsync('Upload Failed', 'Upload failed: ' + err.message);
                    const btn = document.getElementById('cms-link-upload-btn');
                    const icon = btn?.querySelector('i');
                    if (icon) icon.className = 'fa fa-upload';
                }
            }
        };
        input.click();
    },

    triggerFileUploadForId(id, fileType = 'image') {
        const input = document.getElementById('cms-global-file-input');
        if (!input) {
            console.error('[CMS] Global file input not found');
            return;
        }
        input.accept = fileType === 'image' ? 'image/*' : '.pdf, .zip, .doc, .docx';
        input.onchange = async (e) => {
            if (e.target.files.length > 0) {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                // Always use lowercase 'stories' for consistent folder mapping
                const folder = (fileType === 'image' || id.includes('story')) ? 'stories' : 'files';

                try {
                    this.showStatus('Uploading...', 'info');
                    const response = await fetch(`/api/upload?folder=${encodeURIComponent(folder)}`, {
                        method: 'POST',
                        body: formData,
                        credentials: 'include'
                    });
                    if (!response.ok) throw new Error(await response.text());
                    const data = await response.json();
                    const targetInput = document.getElementById(id);
                    if (targetInput) {
                        targetInput.value = data.url;
                        this.showStatus('File uploaded! Remember to Save.', 'success');
                    }
                } catch (err) {
                    console.error('[CMS] Upload Error:', err);
                    await this._showAlertAsync('Upload Error', 'Upload failed: ' + err.message);
                }
            }
        };
        input.click();
    },

    initProductDetailEditor() {
        // [DEPRECATED] Manual editing of Product Details and Downloads is now disabled.
        // Data is dynamically rendered from the unified Resources table feeds.
    },

    // -----------------------------------------------------
    // FILE OR URL PICKER MODAL
    // -----------------------------------------------------
    openFileOrUrlPicker(linkEl, context = 'download', container = null) {
        const existing = document.getElementById('cms-file-url-picker');
        if (existing) existing.remove();

        const currentHref = linkEl.getAttribute('href') || '';
        const currentText = linkEl.innerText.replace(/^\s*/, '').trim();

        const overlay = document.createElement('div');
        overlay.id = 'cms-file-url-picker';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.55);z-index:99999;display:flex;align-items:center;justify-content:center;';
        overlay.innerHTML = `
            <div style="background:#fff;border-radius:10px;padding:30px;width:520px;max-width:96vw;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <h3 style="margin:0;font-size:1.05rem;color:#333;"><i class="fa fa-link" style="color:#d11f26;margin-right:8px;"></i>Set ${context === 'data-sheet' ? 'Data Sheet' : 'Download'} File</h3>
                    <i class="fa fa-times" style="cursor:pointer;font-size:1.2rem;color:#999;" onclick="document.getElementById('cms-file-url-picker').remove()"></i>
                </div>

                <!-- Label field for download items -->
                ${context === 'download' ? `
                <label style="display:block;font-size:0.78rem;font-weight:700;color:#666;margin-bottom:6px;text-transform:uppercase;">Label / File Name</label>
                <input id="cms-picker-label" type="text" value="${currentText}" placeholder="e.g. Overview Guide (PDF)"
                    style="width:100%;padding:8px 12px;border:2px solid #eee;border-radius:6px;font-size:0.9rem;margin-bottom:14px;color:#333;background:#fff;"
                    onfocus="this.style.borderColor='#d11f26'" onblur="this.style.borderColor='#eee'">
                ` : ''}

                <!-- URL Tab -->
                <div style="display:flex;gap:0;margin-bottom:14px;border:2px solid #eee;border-radius:8px;overflow:hidden;">
                    <button id="cms-tab-url" onclick="CMS._switchPickerTab('url')" style="flex:1;padding:9px;background:#d11f26;color:#fff;border:none;font-weight:700;font-size:0.85rem;cursor:pointer;">?? URL / Link</button>
                    <button id="cms-tab-pdf" onclick="CMS._switchPickerTab('pdf')" style="flex:1;padding:9px;background:#eee;color:#555;border:none;font-weight:700;font-size:0.85rem;cursor:pointer;">?? Upload PDF</button>
                </div>

                <div id="cms-picker-url-section">
                    <label style="display:block;font-size:0.78rem;font-weight:700;color:#666;margin-bottom:6px;text-transform:uppercase;">URL / Link</label>
                    <input id="cms-picker-url" type="text" value="${currentHref === '#' ? '' : currentHref}" placeholder="https://example.com/file.pdf"
                        style="width:100%;padding:9px 12px;border:2px solid #eee;border-radius:6px;font-size:0.9rem;color:#333;background:#fff;"
                        onfocus="this.style.borderColor='#d11f26'" onblur="this.style.borderColor='#eee'">
                </div>

                <div id="cms-picker-pdf-section" style="display:none;">
                    <label style="display:block;font-size:0.78rem;font-weight:700;color:#666;margin-bottom:8px;text-transform:uppercase;">Upload PDF File</label>
                    <div id="cms-pdf-drop-zone" style="border:2px dashed #ccc;border-radius:8px;padding:24px;text-align:center;cursor:pointer;background:#fafafa;"
                        onclick="document.getElementById('cms-pdf-file-input').click()">
                        <i class="fa fa-cloud-upload" style="font-size:1.8rem;color:#aaa;"></i>
                        <p style="margin:8px 0 0;color:#888;font-size:0.85rem;">Click to select PDF or drag & drop here</p>
                        <p id="cms-pdf-upload-status" style="margin:6px 0 0;font-size:0.8rem;color:#d11f26;font-weight:700;"></p>
                    </div>
                    <input id="cms-pdf-file-input" type="file" accept=".pdf,application/pdf" style="display:none;">
                </div>

                <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
                    <button onclick="document.getElementById('cms-file-url-picker').remove()" style="padding:9px 20px;border:1px solid #ddd;background:#fff;border-radius:6px;cursor:pointer;font-size:0.9rem;color:#333;">Cancel</button>
                    <button id="cms-picker-save-btn" style="padding:9px 24px;background:#d11f26;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;font-weight:700;"><i class="fa fa-save"></i> APPLY</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // PDF upload handler
        const fileInput = document.getElementById('cms-pdf-file-input');
        fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];
            if (!file) return;
            const statusEl = document.getElementById('cms-pdf-upload-status');
            statusEl.textContent = '? UploadingÃƒÂ¢Ã¢&rdquo;šÂ¬Ã‚Â¦';
            const fd = new FormData();
            fd.append('file', file);
            try {
                const res = await fetch(`/api/upload`, { method: 'POST', body: fd, credentials: 'include' });
                const data = await res.json();
                if (data.url) {
                    document.getElementById('cms-picker-url').value = data.url;
                    statusEl.textContent = '? Uploaded: ' + file.name;
                    CMS._switchPickerTab('url'); // Show the URL tab with filled value
                } else {
                    statusEl.textContent = '? Upload failed';
                }
            } catch (e) {
                statusEl.textContent = '? Error: ' + e.message;
            }
        });

        // Drag & drop
        const dropZone = document.getElementById('cms-pdf-drop-zone');
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = '#d11f26'; });
        dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = '#ccc'; });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#ccc';
            const dt = new DataTransfer();
            dt.items.add(e.dataTransfer.files[0]);
            fileInput.files = dt.files;
            fileInput.dispatchEvent(new Event('change'));
        });

        // Save button
        document.getElementById('cms-picker-save-btn').onclick = () => {
            const url = document.getElementById('cms-picker-url').value.trim();
            if (!url) { this.showAlert('URL Required', 'Please enter a URL or upload a PDF first.'); return; }

            linkEl.setAttribute('href', url);
            linkEl.setAttribute('target', '_blank');

            // Update label for download items
            const labelInput = document.getElementById('cms-picker-label');
            if (labelInput) {
                const newLabel = labelInput.value.trim();
                if (newLabel) {
                    const icon = linkEl.querySelector('i') || document.createElement('i');
                    icon.className = 'fa fa-download';
                    linkEl.innerHTML = '';
                    linkEl.appendChild(icon);
                    linkEl.appendChild(document.createTextNode(' ' + newLabel));
                }
            }

            // Persist state
            const detailPane = document.getElementById('pane-detail');
            const dlRow = document.querySelector('#pane-download .downloads-dark-section .row') ||
                document.querySelector('[data-cms="product-downloads-row"]');

            if (context === 'data-sheet' && detailPane) {
                // No auto-save per user request. Just update DOM and show status.
                this.showStatus('Data sheet link updated. Click SAVE CHANGES to persist.', 'info');
            }
            if (context === 'download' && dlRow) {
                // No auto-save per user request. Just update DOM and show status.
                this.showStatus('Download link updated. Click SAVE CHANGES to persist.', 'info');
            }

            overlay.remove();
        };

        // Close on backdrop
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.getElementById('cms-picker-url').focus();
    },

    _switchPickerTab(tab) {
        const urlSec = document.getElementById('cms-picker-url-section');
        const pdfSec = document.getElementById('cms-picker-pdf-section');
        const urlBtn = document.getElementById('cms-tab-url');
        const pdfBtn = document.getElementById('cms-tab-pdf');
        if (!urlSec || !pdfSec) return;
        if (tab === 'url') {
            urlSec.style.display = ''; pdfSec.style.display = 'none';
            urlBtn.style.cssText = 'flex:1;padding:9px;background:#d11f26;color:#fff;border:none;font-weight:700;font-size:0.85rem;cursor:pointer;';
            pdfBtn.style.cssText = 'flex:1;padding:9px;background:#eee;color:#555;border:none;font-weight:700;font-size:0.85rem;cursor:pointer;';
        } else {
            urlSec.style.display = 'none'; pdfSec.style.display = '';
            pdfBtn.style.cssText = 'flex:1;padding:9px;background:#d11f26;color:#fff;border:none;font-weight:700;font-size:0.85rem;cursor:pointer;';
            urlBtn.style.cssText = 'flex:1;padding:9px;background:#eee;color:#555;border:none;font-weight:700;font-size:0.85rem;cursor:pointer;';
        }
    },

    applyLayout(layout, data = []) {
        if (layout.solutions && layout.solutions.length > 0) {
            const filteredSolutions = layout.solutions.filter(id => {
                const title = (data.find(i => i.element_id === `feat-${id}-title`)?.content_value || '').toLowerCase();
                return !title.includes('siltguard') && !title.includes('silt guard');
            });
            this.rebuildStaticSection('.services-section .col-lg-8 > .row', filteredSolutions, 'solution', data);
        }
        if (layout.apps && layout.apps.length > 0) {
            this.rebuildSliderSection('.application-slider .slick_slider', layout.apps, 'app', data);
        }
        if (layout.posts && layout.posts.length > 0) {
            this.rebuildSliderSection('.blog-section .slick_slider', layout.posts, 'post', data);
        }
        if (layout.stories && layout.stories.length > 0) {
            this.rebuildStaticSection('.product-section .row', layout.stories, 'story', data);
        }
        if (layout.resources && layout.resources.length > 0) {
            this.rebuildStaticSection('.product-section .row', layout.resources, 'resource', data);
        }
    },

    rebuildStaticSection(containerSelector, ids, type, data = []) {
        const row = document.querySelector(containerSelector);
        if (!row) return;

        // Skip rebuild if the current IDs exactly match (to prevent flicker)
        const currentIds = Array.from(row.querySelectorAll(`[data-cms^="${type === 'solution' ? 'feat' : type}-"][data-cms$="-title"]`))
            .map(el => el.getAttribute('data-cms').split('-')[1]);
        if (JSON.stringify([...new Set(currentIds)]) === JSON.stringify([...new Set(ids)])) return;

        // Keep a reference to the prefix for the templates
        let prefix = type === 'solution' ? 'feat' : type;
        if (type === 'story') prefix = 'story';
        if (type === 'resource') prefix = 'res';

        // Clear existing items that look like they belong to this module
        // We use a broader clear to ensure no orphans are left
        row.querySelectorAll(`[data-cms^="${prefix}-"]`).forEach(el => {
            const container = el.closest('.col-md-4, .col-lg-4, .col-sm-4, .col-sm-6, .product-item, .featured-imagebox, .featured-icon-box');
            if (container) container.remove();
        });

        // SAFETY: If the row is still not empty after specific clears and we are doing solutions,
        // we might need to wipe it to avoid duplicates from static HTML inconsistencies
        if (type === 'solution' && row.children.length > ids.length) {
            row.innerHTML = '';
        }

        ids.forEach(id => {
            const html = this.getTemplate(type, id, data);
            const div = document.createElement('div');
            div.innerHTML = html;
            row.appendChild(div.firstElementChild);
        });
    },

    rebuildSliderSection(containerSelector, ids, type, data = []) {
        const row = document.querySelector(containerSelector);
        if (!row) return;

        if (window.jQuery && jQuery(row).hasClass('slick-initialized')) {
            // Remove all slides via Slick API
            const count = jQuery(row).slick('getSlick').slideCount;
            for (let i = count - 1; i >= 0; i--) {
                jQuery(row).slick('slickRemove', i);
            }

            ids.forEach(id => {
                const html = this.getTemplate(type, id, data);
                jQuery(row).slick('slickAdd', html);
            });
        }
    },

    getTemplate(type, id, data = []) {
        const findVal = (key) => data.find(i => i.element_id === key)?.content_value || null;

        if (type === 'solution') {
            const title = findVal(`feat-${id}-title`) || 'NEW SOLUTION';
            const desc = findVal(`feat-${id}-desc`) || 'Description goes here.';
            const link = findVal(`feat-${id}-link`) || '#';

            return `
                <div class="col-md-4 col-sm-4">
                    <div class="featured-icon-box icon-align-top-content style1">
                        <div class="featured-content">
                            <div class="featured-title">
                                <h3 data-cms="feat-${id}-title">${title}</h3>
                            </div>
                            <div class="featured-desc">
                                <p data-cms="feat-${id}-desc">${desc}</p>
                            </div>
                            <a class="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-skincolor" href="${link}" data-cms="feat-${id}-link">read more</a>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'app') {
            const title = findVal(`app-${id}-title`) || 'NEW APPLICATION';
            return `
                <div class="featured-imagebox featured-imagebox-services style1">
                    <div class="featured-content pt-0">
                        <div class="featured-thumbnail text-center padding_top20 padding_bottom20">
                            <i class="fa fa-cube fa-3x ttm-textcolor-skincolor" data-cms="app-${id}-icon"></i>
                        </div>
                        <div class="featured-title">
                            <h3 class="mb-0">
                                <a href="#" data-cms="app-${id}-title">NEW APPLICATION</a>
                            </h3>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'post') {
            const title = findVal(`post-${id}-title`) || 'NEW RESOURCE TITLE';
            const desc = findVal(`post-${id}-desc`) || 'Description goes here.';
            const img = findVal(`post-${id}-img`) || 'images/blog/blog-01-600x430.jpg';
            const date = findVal(`post-${id}-date`) || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

            return `
                <div class="col-lg-4">
                    <div class="featured-imagebox featured-imagebox-post style1">
                        <div class="featured-thumbnail">
                            <img class="img-fluid" src="${img}" data-cms="post-${id}-img" />
                        </div>
                        <div class="featured-content">
                            <div class="ttm-box-post-date">
                                <span class="ttm-entry-date" data-cms="post-${id}-tag"> ARTICLE </span>
                            </div>
                            <div class="post-meta">
                                <span class="ttm-meta-line byline" data-cms="post-${id}-date">${date}</span>
                            </div>
                            <div class="featured-title">
                                <h3><a href="#" data-cms="post-${id}-title">${title}</a></h3>
                            </div>
                            <div class="featured-desc">
                                <p data-cms="post-${id}-desc">${desc}</p>
                            </div>
                            <a class="ttm-btn ttm-btn-size-md ttm-btn-color-dark btn-inline" href="#">read more</a>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'story') {
            const title = findVal(`story-${id}-title`) || 'NEW CASE STUDY';
            const desc = findVal(`story-${id}-desc`) || 'Short description of the story...';
            const img = findVal(`story-${id}-img`) || 'images/stories/story-geogrid.png';

            return `
                <div class="col-lg-4 col-md-6 product-item" data-category="GeoGrid">
                    <a href="#" class="product-card-link">
                        <div class="product-card">
                            <div class="product-img">
                                <img src="${img}" class="img-fluid w-100" data-cms="story-${id}-img" />
                            </div>
                            <div class="pt-3">
                                <h6 data-cms="story-${id}-title">${title}</h6>
                                <p data-cms="story-${id}-desc">${desc}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        } else if (type === 'resource') {
            const title = findVal(`res-${id}-title`) || 'NEW RESOURCE TITLE';
            const desc = findVal(`res-${id}-desc`) || 'Short description of the resource...';
            const img = findVal(`res-${id}-img`) || 'images/resources/resource.jpg';
            const fileUrl = findVal(`res-${id}-link`) || '#';

            // Check if it's a video (length 11 and no dots/slashes usually means a YouTube ID)
            const isVideo = fileUrl.length === 11 && !fileUrl.includes('.');
            // For blogs and webinars, we do not want target="_blank"
            const isBlogOrWebinar = fileUrl.includes('.html') && (fileUrl.includes('blog-') || fileUrl.includes('webinar-'));
            let cardMedia = `
                <a href="${fileUrl}" ${isBlogOrWebinar ? '' : 'target="_blank"'}>
                    <img src="${img}" class="img-fluid w-100" data-cms="res-${id}-img" />
                </a>`;

            if (isVideo) {
                cardMedia = `
                    <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
                        <iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                            src="https://www.youtube.com/embed/${fileUrl}" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                    </div>`;
            }

            return `
                <div class="col-lg-4 col-md-6 product-item" data-category="GeoGrid">
                    <div class="product-card">
                        <div class="product-img">
                            ${cardMedia}
                        </div>
                        <div class="pt-3">
                            <h6 data-cms="res-${id}-title">${title}</h6>
                            <p data-cms="res-${id}-desc">${desc}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        return '';
    },



    injectLoginLink() {
        // Find the "Resources" or "Quick Links" footer widget and add the CMS Login link
        const widgets = document.querySelectorAll('.widget');
        let injected = false;

        // 1. Try "Resources" first
        widgets.forEach(widget => {
            if (injected) return;
            const title = widget.querySelector('.widget-title');
            if (title && title.innerText.toLowerCase().includes('resources')) {
                const list = widget.querySelector('ul');
                if (list && !list.querySelector('a[href="login.html"]')) {
                    const li = document.createElement('li');
                    li.innerHTML = '<a href="login.html">CMS Login</a>';
                    list.appendChild(li);
                    injected = true;
                }
            }
        });

        // 2. Fallback to "Quick Links" if not injected
        if (!injected) {
            widgets.forEach(widget => {
                const title = widget.querySelector('.widget-title');
                if (title && title.innerText.toLowerCase().includes('quick links')) {
                    const list = widget.querySelector('ul');
                    if (list && !list.querySelector('a[href="login.html"]')) {
                        const li = document.createElement('li');
                        li.innerHTML = '<a href="login.html">CMS Login</a>';
                        list.appendChild(li);
                        injected = true;
                    }
                }
            });
        }
    },


    async logout() {
        sessionStorage.removeItem('cms_tab_session');
        await fetch(`/api/admin/logout`, { 
            method: 'POST',
            credentials: 'include'
        });
        window.location.reload();
    },

    refreshWithState() {
        const params = new URLSearchParams(window.location.search);
        params.set('cms_dashboard', 'true');

        // Find current active tab from DOM or fallback to state
        const activeItem = this.dashboardModal?.querySelector('.cms-menu-item.active');
        const tabToKeep = activeItem ? activeItem.getAttribute('data-tab') : (this.activeTab || 'overview');
        
        params.set('cms_tab', tabToKeep);

        const newUrl = window.location.pathname + '?' + params.toString();
        window.location.href = newUrl;
    },

    showAddSolutionForm() {
        this.currentEditId = null;
        const form = document.getElementById('cms-solution-form');
        if (form) {
            form.style.display = 'block';
            document.getElementById('sol-form-title').innerText = "NEW SOLUTION";
            document.getElementById('new-sol-title').value = "";
            document.getElementById('new-sol-desc').value = "";
            document.getElementById('new-sol-img').value = "";
            document.getElementById('new-sol-link').value = "";
            document.getElementById('new-sol-product-family').value = "";
            document.getElementById('new-sol-order').value = "0";
            // Reset checkboxes
            document.querySelectorAll('#new-sol-category-list input[type="checkbox"]').forEach(cb => cb.checked = false);

            // Ensure generate button is visible for NEW solutions
            const btnGenerate = document.getElementById('btn-save-sol');
            if (btnGenerate) btnGenerate.style.display = 'inline-block';

            form.scrollIntoView({ behavior: 'smooth' });
        }
    },

    editSolution(dbId) {
        this.currentEditId = dbId;
        const sol = this.state.solutions.find(s => s.id === dbId);
        const form = document.getElementById('cms-solution-form');
        if (form && sol) {
            form.style.display = 'block';
            document.getElementById('sol-form-title').innerText = "EDIT SOLUTION";
            document.getElementById('new-sol-title').value = sol.title || "";
            document.getElementById('new-sol-desc').value = this.stripHtml(sol.short_description || sol.description || "");
            document.getElementById('new-sol-img').value = sol.icon_image_url || "";
            document.getElementById('new-sol-link').value = sol.custom_link || "";
            document.getElementById('new-sol-product-family').value = sol.product_family || "";
            document.getElementById('new-sol-order').value = sol.display_order || 0;

            // Hide generate button for existing solutions
            const btnGenerate = document.getElementById('btn-save-sol');
            if (btnGenerate) btnGenerate.style.display = 'none';

            // Handle multiple categories
            const cats = (sol.category || "").split(',').map(c => c.trim().toLowerCase());
            document.querySelectorAll('#new-sol-category-list input[type="checkbox"]').forEach(cb => {
                cb.checked = cats.includes(cb.value.toLowerCase());
            });

            form.scrollIntoView({ behavior: 'smooth' });
        }
    },

    async saveSolutionMetadata(createPage = false) {
        const titleInput = document.getElementById('new-sol-title')?.value?.trim() || "";
        const descInput = document.getElementById('new-sol-desc')?.value?.trim() || "";
        const img = document.getElementById('new-sol-img')?.value?.trim();
        const custom_link = document.getElementById('new-sol-link')?.value?.trim();
        const product_family = document.getElementById('new-sol-product-family')?.value;
        const display_order = parseInt(document.getElementById('new-sol-order')?.value) || 0;

        // Collect selected checkboxes
        const selectedCats = Array.from(document.querySelectorAll('#new-sol-category-list input[name="sol-cat"]:checked'))
            .map(cb => cb.value);
        const cat = selectedCats.join(', ');

        const title = this.stripHtml(titleInput).trim();
        const desc = this.stripHtml(descInput).trim();

        if (!title) {
            this._showCustomError('Validation Error', 'A Solution Title is required to save.');
            return;
        }

        const isUpdate = !!this.currentEditId;
        const solId = this.currentEditId;

        try {
            const btnSave = document.getElementById(createPage ? 'btn-save-sol' : 'btn-save-sol-data');
            const originalHTML = btnSave ? btnSave.innerHTML : '';
            if (btnSave) btnSave.innerHTML = '<i class="fa fa-refresh fa-spin"></i> SAVING...';

            const url = isUpdate ? `/api/v2/solutions/${solId}` : `/api/v2/solutions`;
            const method = isUpdate ? 'PATCH' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    description: desc,
                    short_description: desc,
                    icon_image_url: img,
                    category: cat,
                    product_family: product_family,
                    custom_link: custom_link || undefined,
                    display_order: display_order,
                    create_page: createPage
                })
            });
            if (res.ok) {
                const data = await res.json();
                this.currentEditId = null;

                // Standardized Success Alert for Solutions
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                const pageFilename = `solution-${slug}.html`;

                const alertTitle = isUpdate ? 'Solution Updated' : 'Solution Created';
                const bodyMsg = isUpdate 
                    ? `Solution metadata has been successfully updated.\n\nFilename: ${pageFilename}\n\nWould you like to open the updated previous page now to continue editing?`
                    : `A new solution has been successfully created and the dynamic page generated.\n\nFilename: ${pageFilename}\n\nWould you like to open the new page now to edit its content?`;

                await this.showConfirm(alertTitle, bodyMsg, 'OPEN PAGE', 'CLOSE')
                .then(shouldOpen => {
                    if (shouldOpen) {
                        window.location.href = `${pageFilename}?cms_dashboard=true&cms_tab=${this.activeTab || 'solutions'}`;
                    } else {
                        this.refreshWithState();
                    }
                });

            } else {
                const err = await res.json();
                this._showCustomError('Failed to Save', err.error || 'Unknown error occurred while communicating with the database.');
            }
        } catch (e) {
            console.error(e);
            this._showCustomError('Network Error', 'Failed to reach the server. Please check your connection.');
        } finally {
            const btn = document.getElementById(createPage ? 'btn-save-sol' : 'btn-save-sol-data');
            if (btn) {
                btn.innerHTML = createPage ? '<i class="fa fa-save"></i> SAVE & GENERATE PAGE' : '<i class="fa fa-check"></i> SAVE DATA ONLY';
            }
        }
    },

    _showCustomError(title, message) {
        const existing = document.getElementById('cms-error-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'cms-error-modal';
        modal.className = 'cms-confirm-overlay show'; // Re-use the overlay styles
        modal.style.cssText = 'display:flex !important; opacity:1 !important;';
        modal.innerHTML = `
            <div class="cms-confirm-modal" style="background:#fff; border-radius:16px; padding:35px; width:450px; text-align:center; box-shadow:0 15px 50px rgba(0,0,0,0.3); transform: translateY(0) scale(1);">
                <i class="fa fa-exclamation-circle" style="font-size:3rem; color:#d11f26; margin-bottom:15px; display:block;"></i>
                <h3 style="margin:0 0 10px; font-size:1.3rem; color:#333; font-weight:800;">${title}</h3>
                <p style="margin:0 0 25px; color:#666; font-size:0.95rem; line-height:1.5;">${message}</p>
                <button onclick="document.getElementById('cms-error-modal').remove()" style="background:#d11f26; color:#fff; border:none; padding:12px 30px; font-size:0.95rem; font-weight:700; border-radius:6px; cursor:pointer; width:100%;">OK, GOT IT</button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    addDownloadRow(name = '', url = '') {
        const container = document.getElementById('sol-downloads-container');
        if (!container) return;

        const rowId = 'dl-' + Date.now() + Math.random().toString(36).substr(2, 5);
        const row = document.createElement('div');
        row.className = 'cms-dl-row';
        row.style = 'display:grid; grid-template-columns: 1fr 1fr 40px; gap:10px; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;';
        row.innerHTML = `
            <div>
               <label style="font-size:0.6rem; color:#888;">ITEM LABEL</label>
               <input type="text" class="cms-input dl-name" value="${name}" placeholder="e.g. BX1515 Data Sheet (PDF)" style="font-size:0.75rem;">
            </div>
            <div>
                <label style="font-size:0.6rem; color:#888;">FILE / URL</label>
                <div style="display:flex; gap:4px;">
                    <input type="text" id="${rowId}-url" class="cms-input dl-url" value="${url}" placeholder="files/brochure.pdf" style="font-size:0.75rem;">
                    <button class="cms-btn cms-btn-save" onclick="CMS.triggerFileUploadForId('${rowId}-url', 'pdf')" style="padding:0 8px; height:34px;"><i class="fa fa-upload"></i></button>
                </div>
            </div>
            <div style="display:flex; align-items:flex-end;">
                <button class="cms-btn cms-btn-reset" onclick="this.closest('.cms-dl-row').remove()" style="padding:0; height:34px; width:34px;"><i class="fa fa-trash text-danger"></i></button>
            </div>
        `;
        container.appendChild(row);
    },

    showAddAppForm() {
        this.currentEditId = null;
        const form = document.getElementById('cms-application-form');
        if (form) {
            form.style.display = 'block';
            document.getElementById('app-form-title').innerText = "NEW APPLICATION";
            document.getElementById('new-app-title').value = "";
            form.scrollIntoView({ behavior: 'smooth' });
        }
    },

    editApplication(dbId) {
        this.currentEditId = dbId;
        const app = this.state.applications.find(a => a.id === dbId);
        const form = document.getElementById('cms-application-form');
        if (form && app) {
            form.style.display = 'block';
            document.getElementById('app-form-title').innerText = "EDIT APPLICATION";
            document.getElementById('new-app-title').value = app.title || "";
            form.scrollIntoView({ behavior: 'smooth' });
        }
    },

    async saveApplicationMetadata() {
        const title = document.getElementById('new-app-title')?.value?.trim();
        if (!title) { this.showAlert('Required Field', 'An Application Title is required.'); return; }

        const isUpdate = !!this.currentEditId;
        const appId = this.currentEditId;

        try {
            const url = isUpdate ? `/api/v2/applications/${appId}` : `/api/v2/applications`;
            const method = isUpdate ? 'PATCH' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title })
            });
            if (res.ok) {
                this.currentEditId = null;
                this.refreshWithState();
            } else {
                this.showAlert('Error', 'Failed to save application metadata.');
            }
        } catch (e) { console.error(e); }
    },


    /**
     * Renders Product Specifications table from filtered Resources (Technical Datasheets)
     */
    _renderProductDetailsFromState(activeSolution) {
        // Support both old 'pane-detail' and new '#details' IDs
        const detailPane = document.getElementById('details') || document.getElementById('pane-detail');
        if (!detailPane) return;

        const tbody = document.getElementById('product-details-tbody');
        if (!tbody) return;

        // Clear existing rows
        tbody.innerHTML = '';

        const solCats = (activeSolution.category || "").split(',').map(c => c.trim().toLowerCase());
        const productFamily = activeSolution.product_family ? activeSolution.product_family.toLowerCase() : null;
        
        console.log(`[CMS] Filtering resources for Family: "${productFamily}", Cats: [${solCats.join(', ')}]`);

        // Filter resources for Technical Datasheets (pane-docs or technical-documentation) matching these categories
        const relDocs = this.state.resources.filter(r => {
            const type = (r.document_type || "").toLowerCase();
            const isDoc = type === 'pane-docs' || type.includes('technical') || type.includes('doc');
            if (!isDoc) return false;
            
            const resCats = (r.category || "").split(',').map(c => c.trim().toLowerCase().replace(/s$/, '').replace(/[^a-z0-9]/g, '').replace(/^baselok/, ''));
            const solTitleClean = activeSolution.title.replace(/<[^>]*>/g, '').toLowerCase().replace(/s$/, '').replace(/[^a-z0-9]/g, '').replace(/^baselok/, '');
            
            const matched = resCats.some(rc => {
                const familyMatch = productFamily && (rc.includes(productFamily) || productFamily.includes(rc));
                const legacyMatch = rc === solTitleClean || solCats.some(sc => sc.toLowerCase().replace(/s$/, '').replace(/[^a-z0-9]/g, '').replace(/^baselok/, '') === rc);
                
                if (activeSolution.title.toLowerCase().includes('marine')) {
                    console.log(`[CMS] Testing Doc "${r.title}": FamilyMatch=${familyMatch}, LegacyMatch=${legacyMatch}, rc="${rc}", family="${productFamily}"`);
                }
                
                return familyMatch || legacyMatch;
            });
            return matched;
        });

        console.log(`[CMS] Filtering Complete: Matched ${relDocs.length} Technical Docs (Family: ${productFamily})`);

        if (relDocs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2" class="text-center text-muted p-4">No technical specifications available for this product.</td></tr>';
        } else {
            relDocs.forEach(doc => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="color:#333; font-weight: 500;">${this.sanitizeHtmlField(doc.title)}</td>
                    <td class="text-right" style="text-align: right; padding-right: 40px;">
                        <a href="${doc.file_url}" target="_blank" class="download-link" title="Download ${doc.title}" style="color:#d11f26; font-weight:700; text-decoration:none;">
                            DOWNLOAD <i class="fa fa-download ms-1"></i>
                        </a>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
        
        // Also trigger Downloads rendering while we're on the page
        this._renderDownloadsFromState(activeSolution);
    },

    /**
     * Renders Downloads grid from filtered Resources (Downloads)
     */
    _renderDownloadsFromState(activeSolution) {
        const downloadPane = document.getElementById('downloads') || document.getElementById('pane-download');
        if (!downloadPane) return;

        const dlRow = document.getElementById('product-downloads-row');
        if (!dlRow) return;

        // Skip dynamic rendering for Biaxial and Triaxial pages so they can be edited/rendered manually!
        const pageId = document.body.getAttribute('data-page-id') || '';
        if (pageId === 'solution-geogrid-biaxial' || pageId === 'solution-geogrid-triaxial') {
            console.log('[CMS] Skipping dynamic downloads rendering for Biaxial/Triaxial page.');
            return;
        }

        dlRow.innerHTML = '';

        const solCats = (activeSolution.category || "").split(',').map(c => c.trim().toLowerCase());
        const productFamily = activeSolution.product_family ? activeSolution.product_family.toLowerCase() : null;

        const isTechMatch = (str) => {
            return str === 'technical notes' || str === 'white paper' || str === 'whitepaper' ||
                   str === 'tech note' || str === 'notes' ||
                   str.includes('technical note') || str.includes('technical notes') ||
                   str.includes('white paper') || str.includes('whitepaper') ||
                   str.includes('white-paper') || str.includes('white_paper') ||
                   str.includes('tech note') || str.startsWith('note') || str.endsWith('note');
        };

        // Types to completely EXCLUDE from Downloads tab
        const isExcluded = (type, title) => {
            const t = (type || '').toLowerCase().trim();
            const titleLower = (title || '').toLowerCase().trim();
            
            // If the title clearly says it's a white paper or technical note, NEVER exclude it!
            if (isTechMatch(titleLower)) return false;

            // Removed 'event' because user stores Technical Notes/White Papers under pane-events
            return t.includes('blog') || t.includes('webinar') || t.includes('video') ||
                   t.includes('news') || t.includes('podcast');
        };

        // Categorize for Downloads tab: only Datasheets (1), general Downloads (2), and Technical Notes (3)
        const getDocCategory = (type, title) => {
            const t = (type || '').toLowerCase().trim();
            const titleLower = (title || '').toLowerCase().trim();
            if (isExcluded(t, titleLower)) return null;

            // 3. Technical Notes / White Papers
            if (t.includes('event') || t === 'pane-events' || isTechMatch(t) || isTechMatch(titleLower)) {
                return { order: 3, label: 'Technical Notes', icon: 'fa-file-text-o' };
            }
            // 1. Datasheets
            if (t === 'pane-docs' || t === 'datasheet' || t === 'data sheet' || t === 'datasheets' ||
                t.includes('datasheet') || t.includes('data sheet') || t.includes('doc') ||
                (t.includes('technical') && !t.includes('note'))) {
                return { order: 1, label: 'Datasheets', icon: 'fa-file-pdf-o' };
            }
            // 2. General Downloads (PDFs, Guides, Brochures, Reports, etc.)
            if (t.includes('download') || t.includes('pdf') || t.includes('guide') ||
                t.includes('brochure') || t.includes('manual') || t.includes('catalogue') ||
                t.includes('report') || t.includes('handbook')) {
                return { order: 2, label: 'Downloads', icon: 'fa-download' };
            }
            // Default to Downloads if it's not excluded
            return { order: 2, label: 'Downloads', icon: 'fa-download' };
        };

        console.log('[CMS] All resource types in state:', [...new Set(this.state.resources.map(r => r.document_type))]);

        // Filter matching resources (only Downloads tab types)
        const relDownloads = this.state.resources.filter(r => {
            const cat = getDocCategory(r.document_type, r.title);
            if (!cat) return false;
            r._sortOrder = cat.order;
            r._docCat = cat;
            const resCats = (r.category || "").split(',').map(c => c.trim().toLowerCase().replace(/s$/, '').replace(/[^a-z0-9]/g, '').replace(/^baselok/, ''));
            const solTitleClean = activeSolution.title.replace(/<[^>]*>/g, '').toLowerCase().replace(/s$/, '').replace(/[^a-z0-9]/g, '').replace(/^baselok/, '');
            return resCats.some(rc => {
                if (productFamily && (rc.includes(productFamily) || productFamily.includes(rc))) return true;
                return rc === solTitleClean || solCats.some(sc => sc.toLowerCase().replace(/s$/, '').replace(/[^a-z0-9]/g, '').replace(/^baselok/, '') === rc);
            });
        });

        relDownloads.sort((a, b) => (a._sortOrder || 2) - (b._sortOrder || 2));
        console.log(`[CMS] Downloads tab: ${relDownloads.length} items`);

        // ---- Inject Search UI ----
        let searchWrapper = downloadPane.querySelector('#dl-search-wrapper');
        if (!searchWrapper) {
            searchWrapper = document.createElement('div');
            searchWrapper.id = 'dl-search-wrapper';
            searchWrapper.style.cssText = 'position:relative; margin-bottom:24px; margin-top:10px;';
            searchWrapper.innerHTML = `
                <div style="position:relative;">
                    <i class="fa fa-search" style="position:absolute; left:16px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.4); font-size:1rem; pointer-events:none;"></i>
                    <input id="dl-search-input" type="text" placeholder="Search documents…" autocomplete="off"
                        style="width:100%; padding:12px 16px 12px 44px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:#fff; font-size:0.9rem; outline:none; transition: border-color 0.2s, background 0.2s;"
                        onfocus="this.style.borderColor='rgba(209,31,38,0.6)'; this.style.background='rgba(255,255,255,0.10)';"
                        onblur="setTimeout(()=>{const s=document.getElementById('dl-suggestions'); if(s) s.style.display='none';},180); this.style.borderColor='rgba(255,255,255,0.15)'; this.style.background='rgba(255,255,255,0.07)';"
                    />
                </div>
                <ul id="dl-suggestions" style="display:none; position:absolute; top:calc(100% + 6px); left:0; right:0; background:#1e2330; border:1px solid rgba(255,255,255,0.12); border-radius:10px; margin:0; padding:6px 0; list-style:none; z-index:999; box-shadow:0 8px 32px rgba(0,0,0,0.4); max-height:240px; overflow-y:auto;"></ul>
            `;
            downloadPane.insertBefore(searchWrapper, downloadPane.firstChild);

            const searchInput = searchWrapper.querySelector('#dl-search-input');
            const suggBox = searchWrapper.querySelector('#dl-suggestions');

            searchInput.addEventListener('input', () => {
                const q = searchInput.value.toLowerCase().trim();
                const allCards = dlRow.querySelectorAll('[data-dl-title]');
                if (!q) {
                    allCards.forEach(c => c.closest('.dl-card-col').style.display = '');
                    dlRow.querySelectorAll('.dl-section-header').forEach(h => h.style.display = '');
                    suggBox.style.display = 'none';
                    return;
                }
                allCards.forEach(c => {
                    c.closest('.dl-card-col').style.display = c.dataset.dlTitle.toLowerCase().includes(q) ? '' : 'none';
                });
                dlRow.querySelectorAll('.dl-section-header').forEach(header => {
                    let ns = header.nextElementSibling;
                    let vis = false;
                    while (ns && !ns.classList.contains('dl-section-header')) { if (ns.style.display !== 'none') vis = true; ns = ns.nextElementSibling; }
                    header.style.display = vis ? '' : 'none';
                });
                const matches = relDownloads.filter(r => r.title.toLowerCase().includes(q)).slice(0, 6);
                if (matches.length > 0) {
                    suggBox.innerHTML = matches.map(r => `
                        <li data-url="${r.file_url}" style="padding:9px 14px; cursor:pointer; color:rgba(255,255,255,0.85); font-size:0.85rem; display:flex; align-items:center; gap:9px; border-radius:6px; margin:2px 5px;"
                            onmouseover="this.style.background='rgba(209,31,38,0.12)'" onmouseout="this.style.background=''">
                            <i class="fa ${r._docCat.icon}" style="color:#d11f26; flex-shrink:0;"></i>
                            <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${r.title}</span>
                            <span style="font-size:0.65rem; color:rgba(255,255,255,0.35);">${r._docCat.label}</span>
                        </li>`).join('');
                    suggBox.querySelectorAll('li').forEach(li => {
                        li.addEventListener('click', () => {
                            window.open(li.dataset.url, '_blank');
                            searchInput.value = '';
                            suggBox.style.display = 'none';
                            allCards.forEach(c => c.closest('.dl-card-col').style.display = '');
                            dlRow.querySelectorAll('.dl-section-header').forEach(h => h.style.display = '');
                        });
                    });
                    suggBox.style.display = 'block';
                } else {
                    suggBox.innerHTML = `<li style="padding:9px 14px; color:rgba(255,255,255,0.35); font-size:0.85rem;">No results found</li>`;
                    suggBox.style.display = 'block';
                }
            });
        }

        if (relDownloads.length === 0) {
            dlRow.innerHTML = '<div class="col-12 text-center py-5" style="color:rgba(255,255,255,0.4)"><i class="fa fa-folder-open-o fa-3x mb-3 d-block"></i>No downloads currently available for this product.</div>';
            return;
        }

        const sectionLabels = { 1: 'Datasheets', 2: 'Downloads', 3: 'Technical Notes' };
        const sectionIcons  = { 1: 'fa-file-pdf-o', 2: 'fa-download', 3: 'fa-file-text-o' };
        const sectionColors = { 1: '#d11f26', 2: '#e87c1e', 3: '#00b4d8' };
        let currentSection = null;

        relDownloads.forEach((res, idx) => {
            const order = res._sortOrder || 2;
            if (order !== currentSection) {
                currentSection = order;
                const headerCol = document.createElement('div');
                headerCol.className = 'col-12 dl-section-header';
                headerCol.style.cssText = idx === 0 ? 'padding-bottom:10px;' : 'padding-top:24px; padding-bottom:10px;';
                headerCol.innerHTML = `<div style="display:flex; align-items:center; gap:10px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px;"><i class="fa ${sectionIcons[order]}" style="color:${sectionColors[order]};"></i><span style="color:rgba(255,255,255,0.55); font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;">${sectionLabels[order]}</span></div>`;
                dlRow.appendChild(headerCol);
            }
            const color = sectionColors[order] || '#d11f26';
            const icon  = res._docCat ? res._docCat.icon : 'fa-file-o';
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-2 dl-card-col';
            col.innerHTML = `
                <a href="${res.file_url}" target="_blank" data-dl-title="${this.sanitizeHtmlField(res.title)}"
                    style="display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.05); padding:12px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.09); text-decoration:none; transition:all 0.22s; color:#fff;"
                    onmouseover="this.style.background='rgba(255,255,255,0.09)'; this.style.borderColor='rgba(255,255,255,0.16)'; this.style.transform='translateY(-1px)';"
                    onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(255,255,255,0.09)'; this.style.transform='';">
                    <div style="width:34px; height:34px; background:rgba(${color === '#d11f26' ? '209,31,38' : color === '#e87c1e' ? '232,124,30' : '0,180,216'},0.12); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i class="fa ${icon}" style="color:${color}; font-size:1rem;"></i>
                    </div>
                    <div style="flex:1; min-width:0;">
                        <div style="font-weight:600; font-size:0.8rem; line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${this.sanitizeHtmlField(res.title)}</div>
                        <div style="font-size:0.65rem; color:rgba(255,255,255,0.38); margin-top:2px; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">${res._docCat ? res._docCat.label : ''}</div>
                    </div>
                    <i class="fa fa-arrow-down" style="color:rgba(255,255,255,0.4); font-size:0.65rem; flex-shrink:0;"></i>
                </a>
            `;
            dlRow.appendChild(col);
        });
    },

    /**
        });
    },



    /**
     * Renders Case Study primary details from state object
     * This fills basic fields from the success_stories table.
     */
    _renderStoryDetailsFromState(story) {
        if (!story) return;
        console.log(`[CMS] Rendering primary story details for: ${story.title}`);
        
        const titleEl = document.querySelector('[data-cms="story-title"]');
        if (titleEl) titleEl.innerHTML = this.sanitizeHtmlField(story.title || "");
        
        const breadcrumbEl = document.querySelector('[data-cms="story-breadcrumb-title"]');
        if (breadcrumbEl) breadcrumbEl.innerHTML = this.sanitizeHtmlField(story.title || "");

        const heroEl = document.querySelector('[data-cms="story-hero-image"]');
        if (heroEl && story.hero_image_url) {
            if (heroEl.tagName === 'IMG') heroEl.src = story.hero_image_url;
            else heroEl.style.backgroundImage = `url(${story.hero_image_url})`;
            // Sync to main preview image
            const mainImg = document.getElementById('mainImage');
            if (mainImg) mainImg.src = story.hero_image_url;
        }
        
        const challengeEl = document.querySelector('[data-cms="story-challenge-body"]');
        if (challengeEl) {
            if (story.challenge_text) challengeEl.innerHTML = story.challenge_text;
        }

        const solutionEl = document.querySelector('[data-cms="story-solution-body"]');
        if (solutionEl) {
            if (story.solution_text) solutionEl.innerHTML = story.solution_text;
        }
        
        const locationEl = document.querySelector('[data-cms="story-location"]');
        if (locationEl) locationEl.innerText = story.location || "";
        
        const productsEl = document.querySelector('[data-cms="story-products"]');
        if (productsEl) productsEl.innerText = story.products_used || "";
        
        const appEl = document.querySelector('[data-cms="story-application"]');
        if (appEl) appEl.innerText = story.application || "";
        
        const benefitsEl = document.querySelector('[data-cms="story-benefits"]');
        if (benefitsEl) benefitsEl.innerText = story.project_benefits || "";
    },

    _renderRelatedSolutions(pageElementsData) {
        const container = document.getElementById('cms-related-products-row') || document.getElementById('related-solutions-row');
        if (!container) return;

        let related = [];
        let selectedProductIds = [];

        if (pageElementsData) {
            const meta = pageElementsData.find(d => d.element_id === 'app-meta-products');
            if (meta && meta.content_value) {
                selectedProductIds = meta.content_value.split(',').filter(id => id.trim());
            }
        }

        if (this.currentPage.startsWith('application-') || this.currentPage.startsWith('sub-') || this.currentPage.startsWith('market-')) {
            if (selectedProductIds.length > 0) {
                // Saved selection exists → show only selected
                related = (this.state.solutions || []).filter(s => selectedProductIds.includes(s.id));
            } else {
                // No saved data yet → show ALL solutions by default
                related = (this.state.solutions || []);
            }
        } else {
            const currentSolId = document.body.dataset.solId;
            const currentSlug = this._extractSlugFromUrl() || window.location.pathname.split('/').pop().replace('.html', '').replace('solution-', '');
            related = (this.state.solutions || []).filter(s => {
                const isMatch = s.id === currentSolId || (s.slug && s.slug.toLowerCase() === currentSlug.toLowerCase());
                return !isMatch;
            });
        }

        if (related.length === 0) {
            if ($(container).hasClass('slick-initialized')) {
                $(container).slick('unslick');
            }
            container.innerHTML = '<div class="col-12 text-center text-muted py-4">Explore our other innovative solutions below.</div>';
            return;
        }

        if ($(container).hasClass('slick-initialized')) {
            $(container).slick('unslick');
        }

        container.innerHTML = '';
        container.className = 'row cms-products-slider mb_15';
        container.style.position = 'relative';
        
        related.forEach(sol => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 px-3';
            const detailUrl = (sol.slug || "").toLowerCase().startsWith('solution-') ? `${sol.slug.toLowerCase()}.html` : `solution-${(sol.slug || "").toLowerCase()}.html`;
            const imgUrl = sol.icon_image_url || 'images/portfolio/portfolio-01.jpg';
            card.innerHTML = `
                <div class="featured-imagebox featured-imagebox-portfolio style2" onclick="window.location.href='${detailUrl}';" style="cursor: pointer;">
                    <div class="ttm-box-view-overlay ttm-portfolio-box-view-overlay">
                        <div class="featured-thumbnail">
                            <img class="img-fluid w-100" src="${imgUrl}" alt="${sol.title.replace(/<[^>]*>/g, '')}" style="aspect-ratio: 4/3; object-fit: cover;">
                        </div>
                        <div class="ttm-media-link">
                            <a class="ttm_image" title="${sol.title.replace(/<[^>]*>/g, '')}" href="${detailUrl}">
                                <i class="fa fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="featured-content">
                        <div class="featured-title">
                            <h3><a href="${detailUrl}">${this.sanitizeHtmlField(sol.title)}</a></h3>
                        </div>
                        <div class="featured-desc">
                            <p>${this.sanitizeHtmlField(sol.short_description || '')}</p>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Initialize slick
        if (window.jQuery && jQuery.fn.slick) {
            const arrowBtnStyle = 'position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:#e8192c;border:none;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:background 0.3s ease;font-size:0;line-height:1;padding:0;';
            const iconStyle = 'font-size:20px;color:#fff;line-height:1;display:block;';
            const isMobile = window.innerWidth <= 767;
            const isMobileInline = window.innerWidth <= 767;
            const prevArrowHtml = `<button type="button" class="slick-prev cms-slick-prev" style="${arrowBtnStyle}left:${isMobileInline ? '20px' : '-24px'} !important;" onmouseover="this.style.background='#111'" onmouseout="this.style.background='#e8192c'"><i class="fa fa-angle-left" style="${iconStyle}"></i></button>`;
            const nextArrowHtml = `<button type="button" class="slick-next cms-slick-next" style="${arrowBtnStyle}right:${isMobileInline ? '20px' : '-24px'} !important;" onmouseover="this.style.background='#111'" onmouseout="this.style.background='#e8192c'"><i class="fa fa-angle-right" style="${iconStyle}"></i></button>`;
            $(container).slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: prevArrowHtml,
                nextArrow: nextArrowHtml,
                autoplaySpeed: 3000,
                dots: false,
                autoplay: true,
                infinite: true,
                responsive: [
                    {breakpoint:1024, settings:{slidesToShow: 3}},
                    {breakpoint:992, settings:{slidesToShow: 2}},
                    {breakpoint:768, settings:{slidesToShow: 2}},
                    {breakpoint:575, settings:{slidesToShow: 1}}
                ]
            });
            // Force override slick default ::before pseudo styles on our arrows
            $(container).find('.slick-prev, .slick-next').each(function() {
                this.style.cssText = this.getAttribute('style');
            });
        }
    },

    _renderRelatedHighlights(pageElementsData) {
        const container = document.getElementById('cms-related-highlights-row') || document.getElementById('related-highlights-row');
        if (!container) return;

        let related = [];
        let selectedHighlightIds = [];

        if (pageElementsData) {
            const meta = pageElementsData.find(d => d.element_id === 'app-meta-highlights');
            if (meta && meta.content_value) {
                selectedHighlightIds = meta.content_value.split(',').filter(id => id.trim());
            }
        }

        if (this.currentPage.startsWith('application-') || this.currentPage.startsWith('sub-') || this.currentPage.startsWith('market-')) {
            if (selectedHighlightIds.length > 0) {
                related = (this.state.stories || []).filter(s => selectedHighlightIds.includes(s.id));
            }
        } else {
            related = (this.state.stories || []).slice(0, 6);
        }

        if (related.length === 0) {
            if ($(container).hasClass('slick-initialized')) {
                $(container).slick('unslick');
            }
            container.innerHTML = '<div class="col-12 text-center text-muted py-4">No project highlights configured.</div>';
            return;
        }

        if ($(container).hasClass('slick-initialized')) {
            $(container).slick('unslick');
        }

        container.innerHTML = '';
        container.className = 'row cms-highlights-slider mb_15';
        container.style.position = 'relative'; // ensure arrows have proper positioning parent
        
        related.forEach(story => {
            const card = document.createElement('div');
            card.className = 'col-lg-4';
            const detailUrl = (story.slug || "").toLowerCase().startsWith('case-study-') ? `${story.slug.toLowerCase()}.html` : `case-study-${(story.slug || "").toLowerCase()}.html`;
            // Try hero_image_url, cover_image_url, or fallback to default
            const imgUrl = story.hero_image_url || story.cover_image_url || '/assets/blog-01-600x430-DBQtcaFD.jpg';

            // Prioritize products_used for data-category and badge
            let catRaw = story.products_used || 'General';
            if (catRaw.length > 30) { // Handle legacy UUIDs
                const matchingSolution = (this.state.solutions || []).find(s => s.id === story.products_used) || (this.state.solutions || []).find(s => s.id === story.related_solution_id);
                if (matchingSolution) catRaw = matchingSolution.title;
            }
            const cat = (catRaw || '').replace(/<[^>]*>/g, '');
            
            card.innerHTML = `
                <div class="featured-imagebox featured-imagebox-post style1">
                  <div class="featured-thumbnail">
                    <img class="img-fluid" src="${imgUrl}" alt="${story.title.replace(/<[^>]*>/g, '')}">
                  </div>
                  <div class="featured-content">
                    <div class="ttm-box-post-date">
                      <span class="ttm-entry-date">${cat}</span>
                    </div>
                    <div class="post-meta">
                      <span class="ttm-meta-line byline">${story.location || 'USA'}</span>
                    </div>
                    <div class="featured-title">
                      <h3><a href="${detailUrl}">${this.sanitizeHtmlField(story.title)}</a></h3>
                    </div>
                    <div class="featured-desc">
                      <p><b>Application: </b> ${story.application || 'Roads, Pavements & Surfaces'}</p>
                    </div>
                    <div class="featured-desc">
                      <p><b>Benefit: </b> ${story.project_benefits || 'Save time and Money'}</p>
                    </div>
                    <a class="ttm-btn ttm-btn-size-md ttm-btn-color-dark btn-inline mt-2" href="${detailUrl}">read more</a>
                  </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Initialize slick
        if (window.jQuery && jQuery.fn.slick) {
            const arrowBtnStyle = 'position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:#e8192c;border:none;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:background 0.3s ease;font-size:0;line-height:1;padding:0;';
            const iconStyle = 'font-size:20px;color:#fff;line-height:1;display:block;';
            const isMobile = window.innerWidth <= 767;
            const isMobileInline = window.innerWidth <= 767;
            const prevArrowHtml = `<button type="button" class="slick-prev cms-slick-prev" style="${arrowBtnStyle}left:${isMobileInline ? '20px' : '-24px'} !important;" onmouseover="this.style.background='#111'" onmouseout="this.style.background='#e8192c'"><i class="fa fa-angle-left" style="${iconStyle}"></i></button>`;
            const nextArrowHtml = `<button type="button" class="slick-next cms-slick-next" style="${arrowBtnStyle}right:${isMobileInline ? '20px' : '-24px'} !important;" onmouseover="this.style.background='#111'" onmouseout="this.style.background='#e8192c'"><i class="fa fa-angle-right" style="${iconStyle}"></i></button>`;
            $(container).slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: prevArrowHtml,
                nextArrow: nextArrowHtml,
                autoplaySpeed: 2000,
                dots: false,
                autoplay: true,
                infinite: true,
                responsive: [
                    {breakpoint:1024, settings:{slidesToShow: 3}},
                    {breakpoint:900, settings:{slidesToShow: 2}},
                    {breakpoint:575, settings:{slidesToShow: 1}}
                ]
            });
            // Force override slick default ::before pseudo styles on our arrows
            $(container).find('.slick-prev, .slick-next').each(function() {
                this.style.cssText = this.getAttribute('style');
            });
        }
    },



    // ==========================================
    // SUPPORT TAB METHODS
    // ==========================================
    renderSupportTab() {
        let html = `
            <div class="cms-tab-scroll">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <p class="text-muted m-0">Manage Design Engineers shown on the Support page.</p>
                    <button class="cms-add-btn" onclick="CMS.showTeamMemberForm()"><i class="fa fa-plus"></i> ADD TEAM MEMBER</button>
                </div>
                <div id="cms-team-members-list" class="cms-pages-grid">
                    <p class="text-muted">Loading team members...</p>
                </div>
            </div>
        `;
        document.getElementById('cms-tab-content').innerHTML = html;

        fetch('/api/v2/team-members')
            .then(res => res.json())
            .then(members => {
                const container = document.getElementById('cms-team-members-list');
                if (!members || members.length === 0) {
                    container.innerHTML = '<p class="text-muted">No team members found. Click Add to create one.</p>';
                    return;
                }

                container.innerHTML = '';
                members.forEach(member => {
                    const card = document.createElement('div');
                    card.className = 'cms-page-card';
                    card.style.cssText = 'display:flex; flex-direction:column; background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; box-shadow:0 2px 8px rgba(0,0,0,0.05); gap:10px;';
                    
                    const img = member.photo_url || 'https://via.placeholder.com/150';
                    card.innerHTML = `
                        <div style="display:flex; gap:15px; align-items:center;">
                            <img src="${img}" style="width:60px; height:60px; border-radius:50%; object-fit:cover; border:2px solid #d11f26;">
                            <div style="flex-grow:1;">
                                <h4 style="margin:0; font-size:16px;">${member.name}</h4>
                                <span style="font-size:12px; color:#d11f26; font-weight:600;">${member.role}</span>
                                <p style="margin:0; font-size:12px; color:#666;">${member.email}</p>
                            </div>
                        </div>
                        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:auto; border-top:1px solid #eee; padding-top:10px;">
                            <button class="cms-btn-outline-edit" onclick='CMS.showTeamMemberForm(${JSON.stringify(member).replace(/'/g, "&#39;")})'><i class="fa fa-pencil"></i> EDIT</button>
                            <button class="cms-btn-outline-delete" onclick="CMS.deleteTeamMember('${member.id}')"><i class="fa fa-trash"></i> DELETE</button>
                        </div>
                    `;
                    container.appendChild(card);
                });
            })
            .catch(err => {
                console.error("Error fetching team members:", err);
                document.getElementById('cms-team-members-list').innerHTML = '<p class="text-danger">Failed to load team members.</p>';
            });
    },

    showTeamMemberForm(member = null) {
        const isUpdate = !!member;
        const formId = isUpdate ? member.id : '';
        const name = isUpdate ? member.name : '';
        const role = isUpdate ? member.role : '';
        const credentials = isUpdate ? member.credentials : '';
        const email = isUpdate ? member.email : '';
        const photoUrl = isUpdate ? member.photo_url : '';
        const order = isUpdate ? member.display_order : 0;

        const html = `
            <div style="margin-bottom:15px;">
                <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px; color:#333;">Name</label>
                <input type="text" id="tm-name" class="cms-input" value="${name}" placeholder="e.g. Keith Brooks" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <div style="margin-bottom:15px;">
                <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px; color:#333;">Role</label>
                <input type="text" id="tm-role" class="cms-input" value="${role}" placeholder="e.g. Director of Engineering" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <div style="margin-bottom:15px;">
                <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px; color:#333;">Credentials</label>
                <input type="text" id="tm-credentials" class="cms-input" value="${credentials}" placeholder="e.g. P.E. &bull; Professional Engineer" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <div style="margin-bottom:15px;">
                <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px; color:#333;">Email</label>
                <input type="email" id="tm-email" class="cms-input" value="${email}" placeholder="e.g. user@ind-fab.com" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <div style="margin-bottom:15px;">
                <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px; color:#333;">Display Order</label>
                <input type="number" id="tm-order" class="cms-input" value="${order}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <div style="margin-bottom:15px;">
                <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px; color:#333;">Photo</label>
                <div style="display:flex; gap:10px; align-items:center;">
                    <img id="tm-photo-preview" src="${photoUrl || 'https://via.placeholder.com/60'}" style="width:60px; height:60px; object-fit:cover; border-radius:4px; border:1px solid #ddd;">
                    <input type="hidden" id="tm-photo-url" value="${photoUrl}">
                    <button class="cms-btn-outline" onclick="CMS.triggerImagePickerForForm('tm-photo-url', 'tm-photo-preview')" style="padding:8px 15px;"><i class="fa fa-picture-o"></i> Select Image</button>
                </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
                <button class="cms-btn-outline" onclick="document.getElementById('cms-team-modal').remove()">CANCEL</button>
                <button class="cms-btn-save" onclick="CMS.saveTeamMember('${formId}')"><i class="fa fa-save"></i> ${isUpdate ? 'UPDATE' : 'CREATE'}</button>
            </div>
        `;

        const modal = document.createElement('div');
        modal.id = 'cms-team-modal';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:2000005; display:flex; align-items:center; justify-content:center;';
        modal.innerHTML = `
            <div style="background:#fff; width:500px; max-width:90%; border-radius:8px; padding:20px; max-height:90vh; overflow-y:auto;">
                <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:20px;">${isUpdate ? 'Edit Team Member' : 'Add Team Member'}</h3>
                ${html}
            </div>
        `;
        document.body.appendChild(modal);
    },

    saveTeamMember(id) {
        const payload = {
            name: document.getElementById('tm-name').value.trim(),
            role: document.getElementById('tm-role').value.trim(),
            credentials: document.getElementById('tm-credentials').value.trim(),
            email: document.getElementById('tm-email').value.trim(),
            display_order: parseInt(document.getElementById('tm-order').value) || 0,
            photo_url: document.getElementById('tm-photo-url').value
        };

        if (!payload.name || !payload.role) {
            this.showStatus('Name and Role are required', 'error');
            return;
        }

        const isUpdate = !!id;
        const method = isUpdate ? 'PATCH' : 'POST';
        const url = isUpdate ? `/api/v2/team-members/${id}` : '/api/v2/team-members';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to save team member');
            return res.json();
        })
        .then(data => {
            document.getElementById('cms-team-modal').remove();
            this.showStatus('Team member saved successfully', 'success');
            this.renderSupportTab();
            if (this.currentPage === 'support') {
                this._renderDynamicTeamMembers();
            }
        })
        .catch(err => {
            console.error(err);
            this.showStatus('Error saving team member', 'error');
        });
    },

    deleteTeamMember(id) {
        this.confirmAction("Are you sure you want to delete this team member?", () => {
            fetch(`/api/v2/team-members/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete team member');
                this.showStatus('Team member deleted', 'success');
                this.renderSupportTab();
                if (this.currentPage === 'support') {
                    this._renderDynamicTeamMembers();
                }
            })
            .catch(err => {
                console.error(err);
                this.showStatus('Error deleting team member', 'error');
            });
        });
    },

    // ==========================================
    // REGIONAL OFFICES (LOCATIONS) TAB METHODS
    // ==========================================
    _ensureLeaflet(cb) {
        if (window.L) { cb(); return; }
        if (!document.getElementById('leaflet-css')) {
            const css = document.createElement('link');
            css.id = 'leaflet-css'; css.rel = 'stylesheet';
            css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(css);
        }
        if (!document.getElementById('leaflet-js')) {
            const js = document.createElement('script');
            js.id = 'leaflet-js'; js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            js.onload = () => cb();
            document.head.appendChild(js);
        } else {
            const t = setInterval(() => { if (window.L) { clearInterval(t); cb(); } }, 100);
        }
    },

    
    async renderApplicationsConfigTab() {
        const content = document.getElementById('cms-tab-content');
        content.innerHTML = '<p class="text-muted">Loading data...</p>';

        try {
            const [solRes, storyRes] = await Promise.all([
                fetch('/api/v2/solutions'),
                fetch('/api/v2/stories', { credentials: 'include' })
            ]);
            
            const solutions = await solRes.json();
            const stories = await storyRes.json();

            // Group pages into categories for cascading dropdown
            const categories = {
                'Main Applications': CMS_ALL_PAGES.filter(p => p.file.startsWith('application-')),
                'Roadways': CMS_ALL_PAGES.filter(p => p.file.startsWith('sub-') && p.file.includes('roadways')),
                'Walls & Slopes': CMS_ALL_PAGES.filter(p => p.file.startsWith('sub-') && p.file.includes('walls-slopes')),
                'Railways': CMS_ALL_PAGES.filter(p => p.file.startsWith('sub-') && p.file.includes('railways')),
                'Structure & Foundation': CMS_ALL_PAGES.filter(p => p.file.startsWith('sub-') && p.file.includes('structure')),
                'Marine': CMS_ALL_PAGES.filter(p => p.file.startsWith('sub-') && p.file.includes('marine')),
                'Environmental': CMS_ALL_PAGES.filter(p => p.file.startsWith('sub-') && p.file.includes('environmental')),
                'Markets': CMS_ALL_PAGES.filter(p => p.file.startsWith('market-'))
            };
            // Flat list for search
            const allConfigPages = Object.values(categories).flat();
            CMS._currentAppCategories = categories;

            let html = `
                <div class="cms-tab-scroll" style="padding-bottom:100px;">
                    <p class="text-muted mb-4">Select a Category and then an Application/Market Page to configure its Related Products and Project Highlights.</p>

                    <!-- PAGE SEARCH -->
                    <div class="mb-3" style="position:relative;">
                        <label style="font-weight:700; color:#1a1a1a; display:block; margin-bottom:6px;">SEARCH PAGE <span style="font-weight:400; color:#888; font-size:12px;">(type 2+ chars for suggestions)</span></label>
                        <div style="position:relative;">
                            <i class="fa fa-search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#aaa;"></i>
                            <input type="text" id="cms-page-search" class="cms-input" placeholder="e.g. roadways, marine, renewable..." style="padding-left:36px;" oninput="CMS.onPageSearchInput(this.value)" autocomplete="off">
                        </div>
                        <div id="cms-page-search-suggestions" style="display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #ddd;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:999;max-height:220px;overflow-y:auto;"></div>
                    </div>
                    
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label style="font-weight:700; color:#1a1a1a;">SELECT CATEGORY</label>
                                <select id="cms-app-category-select" class="cms-input" onchange="CMS.onAppCategoryChange(this.value)">
                                    <option value="">-- Choose a category --</option>
                                    ${Object.keys(categories).map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label style="font-weight:700; color:#1a1a1a;">SELECT PAGE</label>
                                <select id="cms-app-page-select" class="cms-input" onchange="CMS.loadApplicationConfig(this.value)" disabled>
                                    <option value="">-- First choose a category --</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div id="cms-app-config-ui" style="display:none; border:1px solid #ddd; padding:20px; border-radius:8px; background:#f9f9f9;">
                        
                        <h5 style="color:#d11f26; margin-bottom:15px;"><i class="fa fa-cubes"></i> Related Products</h5>
                        <div class="row mb-4" id="cms-app-products-container">
                            ${solutions.map(s => `
                                <div class="col-md-6 mb-2">
                                    <label style="display:flex; align-items:center; cursor:pointer;">
                                        <input type="checkbox" name="app_product" value="${s.id}" style="margin-right:10px; transform:scale(1.2);">
                                        ${s.title}
                                    </label>
                                </div>
                            `).join('')}
                        </div>

                        <hr>

                        <h5 style="color:#d11f26; margin-bottom:15px; margin-top:20px;"><i class="fa fa-folder-open"></i> Project Highlights</h5>
                        <div class="row mb-4" id="cms-app-highlights-container">
                            ${stories.map(s => `
                                <div class="col-md-6 mb-2">
                                    <label style="display:flex; align-items:center; cursor:pointer;">
                                        <input type="checkbox" name="app_highlight" value="${s.id}" style="margin-right:10px; transform:scale(1.2);">
                                        ${s.title}
                                    </label>
                                </div>
                            `).join('')}
                        </div>

                        <button class="cms-btn cms-btn-save w-100" onclick="CMS.saveApplicationConfig()">
                            <i class="fa fa-save"></i> SAVE CONFIGURATION FOR THIS PAGE
                        </button>
                    </div>
                </div>
            `;

            content.innerHTML = html;
            // Store flat page list for search
            CMS._allConfigPages = allConfigPages;
            CMS._allConfigCategories = categories;

        } catch (err) {
            console.error(err);
            content.innerHTML = '<p class="text-danger">Failed to load API data.</p>';
        }
    },

    onPageSearchInput(query) {
        const box = document.getElementById('cms-page-search-suggestions');
        if (!box) return;
        if (!query || query.length < 2) {
            box.style.display = 'none';
            box.innerHTML = '';
            return;
        }
        const q = query.toLowerCase();
        const pages = CMS._allConfigPages || [];
        const matches = pages.filter(p => p.title.toLowerCase().includes(q) || p.file.toLowerCase().includes(q)).slice(0, 10);
        if (matches.length === 0) {
            box.innerHTML = '<div style="padding:10px 14px;color:#888;font-size:13px;">No pages found</div>';
            box.style.display = 'block';
            return;
        }
        box.innerHTML = matches.map(p => `
            <div onclick="CMS.selectPageFromSearch('${p.file.replace('.html','')}', '${p.title.replace(/'/g, "\\'")}')"
                 style="padding:10px 14px;cursor:pointer;border-bottom:1px solid #f1f1f1;font-size:13px;display:flex;align-items:center;gap:10px;"
                 onmouseover="this.style.background='#fbe9eb'" onmouseout="this.style.background=''">
                <i class="fa fa-file-text-o" style="color:#d11f26;"></i>
                <span style="font-weight:600;">${p.title}</span>
                <span style="margin-left:auto;font-size:11px;color:#aaa;">${p.file}</span>
            </div>
        `).join('');
        box.style.display = 'block';
    },

    selectPageFromSearch(pageSlug, pageTitle) {
        const box = document.getElementById('cms-page-search-suggestions');
        const searchInput = document.getElementById('cms-page-search');
        if (box) box.style.display = 'none';
        if (searchInput) searchInput.value = pageTitle;

        // Find which category this page belongs to
        const cats = CMS._allConfigCategories || {};
        let foundCat = null;
        for (const [cat, pages] of Object.entries(cats)) {
            if (pages.some(p => p.file.replace('.html', '') === pageSlug)) {
                foundCat = cat;
                break;
            }
        }
        if (foundCat) {
            const catSelect = document.getElementById('cms-app-category-select');
            if (catSelect) catSelect.value = foundCat;
            CMS.onAppCategoryChange(foundCat);
        }
        const pageSelect = document.getElementById('cms-app-page-select');
        if (pageSelect) {
            pageSelect.value = pageSlug;
            CMS.loadApplicationConfig(pageSlug);
        }
    },

    onAppCategoryChange(category) {
        const pageSelect = document.getElementById('cms-app-page-select');
        const ui = document.getElementById('cms-app-config-ui');
        if (ui) ui.style.display = 'none';
        
        pageSelect.innerHTML = '<option value="">-- Choose a page --</option>';
        
        if (!category || !CMS._currentAppCategories[category]) {
            pageSelect.disabled = true;
            return;
        }

        const pages = CMS._currentAppCategories[category];
        pages.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.file.replace('.html', '');
            opt.textContent = p.title;
            pageSelect.appendChild(opt);
        });
        pageSelect.disabled = false;
    },

    async loadApplicationConfig(pageName) {
        const ui = document.getElementById('cms-app-config-ui');
        if (!pageName) {
            ui.style.display = 'none';
            return;
        }

        ui.style.display = 'block';
        
        // Default: check ALL checkboxes first
        document.querySelectorAll('input[name="app_product"], input[name="app_highlight"]').forEach(cb => cb.checked = true);

        // Fetch saved metadata - if saved data exists, use it; otherwise keep all checked
        try {
            const res = await fetch(`/api/v2/page-elements/${pageName}?t=${Date.now()}`, { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                
                const productsField = data.find(d => d.element_id === 'app-meta-products');
                if (productsField && productsField.content_value && productsField.content_value.trim()) {
                    // If saved data exists, override defaults with saved selection
                    document.querySelectorAll('input[name="app_product"]').forEach(cb => cb.checked = false);
                    const ids = productsField.content_value.split(',').filter(Boolean);
                    ids.forEach(id => {
                        const cb = document.querySelector(`input[name="app_product"][value="${id}"]`);
                        if (cb) cb.checked = true;
                    });
                }

                const highlightsField = data.find(d => d.element_id === 'app-meta-highlights');
                if (highlightsField && highlightsField.content_value && highlightsField.content_value.trim()) {
                    // If saved data exists, override defaults with saved selection
                    document.querySelectorAll('input[name="app_highlight"]').forEach(cb => cb.checked = false);
                    const ids = highlightsField.content_value.split(',').filter(Boolean);
                    ids.forEach(id => {
                        const cb = document.querySelector(`input[name="app_highlight"][value="${id}"]`);
                        if (cb) cb.checked = true;
                    });
                }
            }
        } catch (e) {
            console.error('Failed to load page config', e);
        }
    },

    async saveApplicationConfig() {
        const pageName = document.getElementById('cms-app-page-select').value;
        if (!pageName) return;

        const selectedProducts = Array.from(document.querySelectorAll('input[name="app_product"]:checked')).map(cb => cb.value).join(',');
        const selectedHighlights = Array.from(document.querySelectorAll('input[name="app_highlight"]:checked')).map(cb => cb.value).join(',');

        const btn = document.querySelector('#cms-app-config-ui .cms-btn-save');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> SAVING...';

        try {
            await fetch(`/api/v2/page-elements`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ page_slug: pageName, element_id: 'app-meta-products', content_type: 'text', content_value: selectedProducts })
            });

            await fetch(`/api/v2/page-elements`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ page_slug: pageName, element_id: 'app-meta-highlights', content_type: 'text', content_value: selectedHighlights })
            });

            this.showStatus('Application Configuration Saved! Refreshing page...', 'success');
            // Auto-refresh the configured page if we are currently on it
            setTimeout(() => {
                const currentPageSlug = this.currentPage;
                if (currentPageSlug && currentPageSlug === pageName) {
                    window.location.reload();
                } else {
                    // Still reload after save for consistency
                    window.location.reload();
                }
            }, 1200);
        } catch (e) {
            this.showStatus('Failed to save configuration', 'error');
        } finally {
            btn.innerHTML = origText;
        }
    },

    renderLocationsTab() {
        const html = `
            <div class="cms-tab-scroll">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <p class="text-muted m-0">Manage Regional Offices shown on the Contact Us page (cards + map).</p>
                    <button class="cms-add-btn" onclick="CMS.showOfficeForm()"><i class="fa fa-plus"></i> ADD OFFICE</button>
                </div>
                <div id="cms-offices-list" class="cms-pages-grid">
                    <p class="text-muted">Loading offices...</p>
                </div>
            </div>
        `;
        document.getElementById('cms-tab-content').innerHTML = html;

        fetch('/api/v2/regional-offices')
            .then(res => res.json())
            .then(offices => {
                const container = document.getElementById('cms-offices-list');
                if (!offices || offices.length === 0) {
                    container.innerHTML = '<p class="text-muted">No offices found. Click Add to create one.</p>';
                    return;
                }
                container.innerHTML = '';
                offices.forEach(office => {
                    const card = document.createElement('div');
                    card.className = 'cms-page-card';
                    card.style.cssText = 'display:flex; flex-direction:column; background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; box-shadow:0 2px 8px rgba(0,0,0,0.05); gap:10px;';
                    const coords = (office.lat != null && office.lng != null) ? `${office.lat}, ${office.lng}` : 'No map pin set';
                    card.innerHTML = `
                        <div style="display:flex; gap:15px; align-items:flex-start;">
                            <div style="width:42px;height:42px;flex-shrink:0;background:#fff0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;"><i class="fa fa-map-marker" style="color:#d11f26;font-size:1.1rem;"></i></div>
                            <div style="flex-grow:1;">
                                <h4 style="margin:0; font-size:16px;">${office.name || ''}</h4>
                                <p style="margin:2px 0; font-size:12px; color:#666;">${office.address || ''}${office.city_state ? ', ' + office.city_state : ''}</p>
                                <p style="margin:0; font-size:11px; color:#999;"><i class="fa fa-map-pin"></i> ${coords}</p>
                            </div>
                        </div>
                        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:auto; border-top:1px solid #eee; padding-top:10px;">
                            <button class="cms-btn-outline-edit" onclick='CMS.showOfficeForm(${JSON.stringify(office).replace(/'/g, "&#39;")})'><i class="fa fa-pencil"></i> EDIT</button>
                            <button class="cms-btn-outline-delete" onclick="CMS.deleteOffice('${office.id}')"><i class="fa fa-trash"></i> DELETE</button>
                        </div>
                    `;
                    container.appendChild(card);
                });
            })
            .catch(err => {
                console.error("Error fetching offices:", err);
                document.getElementById('cms-offices-list').innerHTML = '<p class="text-danger">Failed to load offices.</p>';
            });
    },

    showOfficeForm(office = null) {
        const isUpdate = !!office;
        const o = office || {};
        const v = (x) => (x === null || x === undefined) ? '' : String(x);

        const html = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div style="grid-column:1 / -1;">
                    <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px;">Office Name *</label>
                    <input type="text" id="off-name" class="cms-input" value="${v(o.name)}" placeholder="e.g. Houston" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div>
                    <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px;">Address</label>
                    <input type="text" id="off-address" class="cms-input" value="${v(o.address)}" placeholder="e.g. 5102 Galveston Rd." style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div>
                    <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px;">City, State ZIP</label>
                    <input type="text" id="off-city" class="cms-input" value="${v(o.city_state)}" placeholder="e.g. Houston, TX 77017" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div>
                    <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px;">Phone 1</label>
                    <input type="text" id="off-phone1" class="cms-input" value="${v(o.phone1)}" placeholder="1-713-641-2727" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div>
                    <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px;">Phone 2</label>
                    <input type="text" id="off-phone2" class="cms-input" value="${v(o.phone2)}" placeholder="(optional)" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div>
                    <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px;">Hours</label>
                    <input type="text" id="off-hours" class="cms-input" value="${v(o.hours)}" placeholder="MonÃ¢â‚¬&ldquo;Fri 8AMÃ¢â‚¬&ldquo;5PM" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
                <div>
                    <label style="display:block; font-weight:600; margin-bottom:5px; font-size:13px;">Display Order</label>
                    <input type="number" id="off-order" class="cms-input" value="${v(o.display_order) || 0}" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
                </div>
            </div>

            <div style="margin-top:18px; border-top:1px solid #eee; padding-top:15px;">
                <label style="display:block; font-weight:700; margin-bottom:8px; font-size:13px; color:#d11f26;"><i class="fa fa-map-marker"></i> MAP LOCATION</label>
                <div style="position:relative; margin-bottom:10px; z-index:5000;">
                    <div style="display:flex; gap:8px;">
                        <input type="text" id="office-map-search" autocomplete="off" class="cms-input" placeholder="Type an address / city Ã¢â‚¬&rdquo; suggestions appear..." style="flex-grow:1; padding:8px; border:1px solid #ddd; border-radius:4px;" oninput="CMS.onOfficeSearchInput(this.value)" onkeydown="if(event.key==='Enter'){event.preventDefault();CMS.searchOfficeLocation();}">
                        <button class="cms-btn-outline" type="button" onclick="CMS.searchOfficeLocation()" style="padding:8px 14px;"><i class="fa fa-search"></i> Search</button>
                    </div>
                    <div id="office-search-suggestions" style="display:none; position:absolute; top:100%; left:0; right:72px; background:#fff; border:1px solid #ddd; border-top:none; border-radius:0 0 6px 6px; box-shadow:0 6px 18px rgba(0,0,0,0.14); z-index:5001; max-height:230px; overflow-y:auto;"></div>
                </div>
                <div id="office-map-picker" style="width:100%; height:300px; border-radius:8px; border:1px solid #ddd; background:#eee;"></div>
                <p style="font-size:11px; color:#888; margin:6px 0 0;">Click on the map (or drag the pin) to set the office location.</p>
                <div style="display:flex; gap:12px; margin-top:8px;">
                    <div style="flex:1;"><label style="font-size:11px; color:#666;">Latitude</label><input type="number" step="any" id="off-lat" class="cms-input" value="${v(o.lat)}" style="width:100%; padding:6px; border:1px solid #ddd; border-radius:4px;"></div>
                    <div style="flex:1;"><label style="font-size:11px; color:#666;">Longitude</label><input type="number" step="any" id="off-lng" class="cms-input" value="${v(o.lng)}" style="width:100%; padding:6px; border:1px solid #ddd; border-radius:4px;"></div>
                </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
                <button class="cms-btn-outline" onclick="document.getElementById('cms-office-modal').remove()">CANCEL</button>
                <button class="cms-btn-save" onclick="CMS.saveOffice('${isUpdate ? o.id : ''}')"><i class="fa fa-save"></i> ${isUpdate ? 'UPDATE' : 'CREATE'}</button>
            </div>
        `;

        const modal = document.createElement('div');
        modal.id = 'cms-office-modal';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:2000005; display:flex; align-items:center; justify-content:center;';
        modal.innerHTML = `
            <div style="background:#fff; width:640px; max-width:95%; border-radius:8px; padding:22px; max-height:92vh; overflow-y:auto;">
                <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:18px;">${isUpdate ? 'Edit Regional Office' : 'Add Regional Office'}</h3>
                ${html}
            </div>
        `;
        document.body.appendChild(modal);

        // Initialize the map picker (load Leaflet if needed)
        this._ensureLeaflet(() => this._initOfficeMapPicker(o.lat, o.lng));
    },

    _initOfficeMapPicker(initialLat, initialLng) {
        const mapEl = document.getElementById('office-map-picker');
        if (!mapEl || !window.L) return;
        const hasCoords = initialLat != null && initialLng != null && !isNaN(parseFloat(initialLat));
        const center = hasCoords ? [parseFloat(initialLat), parseFloat(initialLng)] : [37.8, -96];
        const zoom = hasCoords ? 13 : 4;
        const map = L.map(mapEl).setView(center, zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors', maxZoom: 19
        }).addTo(map);

        const setCoords = (lat, lng) => {
            document.getElementById('off-lat').value = Number(lat).toFixed(6);
            document.getElementById('off-lng').value = Number(lng).toFixed(6);
        };
        let marker = hasCoords ? L.marker(center, { draggable: true }).addTo(map) : null;
        const bindDrag = () => marker.on('dragend', () => { const p = marker.getLatLng(); setCoords(p.lat, p.lng); });
        if (marker) bindDrag();

        const place = (lat, lng) => {
            if (marker) { marker.setLatLng([lat, lng]); }
            else { marker = L.marker([lat, lng], { draggable: true }).addTo(map); bindDrag(); }
            setCoords(lat, lng);
        };
        map.on('click', (e) => place(e.latlng.lat, e.latlng.lng));

        this._officePickerPlace = (lat, lng) => { place(lat, lng); map.setView([lat, lng], 14); };
        setTimeout(() => map.invalidateSize(), 250);
    },

    searchOfficeLocation() {
        const q = (document.getElementById('office-map-search') || {}).value;
        if (!q || !q.trim()) return;
        fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(q.trim()))
            .then(r => r.json())
            .then(arr => {
                if (!arr || !arr.length) { this.showStatus('Location not found', 'error'); return; }
                const lat = parseFloat(arr[0].lat), lng = parseFloat(arr[0].lon);
                if (this._officePickerPlace) this._officePickerPlace(lat, lng);
            })
            .catch(() => this.showStatus('Map search failed', 'error'));
    },

    onOfficeSearchInput(q) {
        const box = document.getElementById('office-search-suggestions');
        if (!box) return;
        clearTimeout(this._officeSearchTimer);
        const query = (q || '').trim();
        if (query.length < 3) { box.style.display = 'none'; box.innerHTML = ''; return; }
        const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this._officeSearchTimer = setTimeout(() => {
            fetch('https://nominatim.openstreetmap.org/search?format=json&limit=6&q=' + encodeURIComponent(query), { headers: { 'Accept-Language': 'en' } })
                .then(r => r.json())
                .then(arr => {
                    if (!arr || !arr.length) { box.style.display = 'none'; box.innerHTML = ''; return; }
                    this._officeSuggestions = arr;
                    box.innerHTML = arr.map((item, i) =>
                        `<div style="padding:9px 12px; font-size:13px; cursor:pointer; border-bottom:1px solid #f0f0f0; line-height:1.35;" onmouseover="this.style.background='#fff0f0'" onmouseout="this.style.background='#fff'" onclick="CMS.selectOfficeSuggestion(${i})"><i class="fa fa-map-marker" style="color:#d11f26; margin-right:7px;"></i>${esc(item.display_name)}</div>`
                    ).join('');
                    box.style.display = 'block';
                })
                .catch(() => { box.style.display = 'none'; });
        }, 350);
    },

    selectOfficeSuggestion(index) {
        const item = (this._officeSuggestions || [])[index];
        if (!item) return;
        const input = document.getElementById('office-map-search');
        if (input) input.value = item.display_name;
        const box = document.getElementById('office-search-suggestions');
        if (box) { box.style.display = 'none'; box.innerHTML = ''; }
        if (this._officePickerPlace) this._officePickerPlace(parseFloat(item.lat), parseFloat(item.lon));
    },

    saveOffice(id) {
        const num = (elId) => { const x = document.getElementById(elId).value.trim(); return x === '' ? null : parseFloat(x); };
        const payload = {
            name: document.getElementById('off-name').value.trim(),
            address: document.getElementById('off-address').value.trim(),
            city_state: document.getElementById('off-city').value.trim(),
            phone1: document.getElementById('off-phone1').value.trim(),
            phone2: document.getElementById('off-phone2').value.trim(),
            hours: document.getElementById('off-hours').value.trim(),
            display_order: parseInt(document.getElementById('off-order').value) || 0,
            lat: num('off-lat'),
            lng: num('off-lng')
        };
        if (!payload.name) { this.showStatus('Office name is required', 'error'); return; }

        const isUpdate = !!id;
        const url = isUpdate ? `/api/v2/regional-offices/${id}` : '/api/v2/regional-offices';
        fetch(url, {
            method: isUpdate ? 'PATCH' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => { if (!res.ok) throw new Error('Failed to save office'); return res.json(); })
        .then(() => {
            const m = document.getElementById('cms-office-modal'); if (m) m.remove();
            this.showStatus('Office saved successfully', 'success');
            this.renderLocationsTab();
        })
        .catch(err => { console.error(err); this.showStatus('Error saving office', 'error'); });
    },

    deleteOffice(id) {
        this.confirmAction("Are you sure you want to delete this office?", () => {
            fetch(`/api/v2/regional-offices/${id}`, { method: 'DELETE' })
            .then(res => { if (!res.ok) throw new Error('Failed to delete office'); this.showStatus('Office deleted', 'success'); this.renderLocationsTab(); })
            .catch(err => { console.error(err); this.showStatus('Error deleting office', 'error'); });
        });
    },

    _renderDynamicTeamMembers() {
        const container = document.getElementById('design-team-grid');
        if (!container) return;

        fetch('/api/v2/team-members')
            .then(res => res.json())
            .then(members => {
                if (window.jQuery && jQuery(container).hasClass('slick-initialized')) {
                    jQuery(container).slick('unslick');
                }
                
                container.innerHTML = '';
                if (!members || members.length === 0) {
                    return;
                }

                // Render as a single-row Slick slider (3 visible at a time), modelled
                // on the "Latest Articles" carousel so it auto-slides through all members.
                container.innerHTML = members.map(member => `
                    <div class="col-lg-4 px-3">
                        <div class="team-member-row">
                            <div class="team-member-photo">
                                <img src="${member.photo_url || 'https://via.placeholder.com/400x400'}" alt="${member.name}" />
                            </div>
                            <div class="team-member-info">
                                <span class="role-tag">${member.role}</span>
                                <h3>${member.name}</h3>
                                <p class="credentials">${member.credentials}</p>
                                <div class="divider"></div>
                                <a href="mailto:${member.email}" class="contact-link">
                                    <i class="fa fa-envelope-o"></i>
                                    <span>${member.email}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `).join('');

                // Initialize/refresh Slick slider (retry until Slick is loaded)
                const initSlider = () => {
                    if (!window.jQuery || typeof jQuery.fn.slick !== 'function') {
                        setTimeout(initSlider, 200);
                        return;
                    }
                    if (jQuery(container).hasClass('slick-initialized')) {
                        jQuery(container).slick('unslick');
                    }
                    jQuery(container).slick({
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: true,
                        prevArrow: '<button type="button" class="team-slick-arrow team-slick-prev" aria-label="Previous"><i class="fa fa-chevron-left"></i></button>',
                        nextArrow: '<button type="button" class="team-slick-arrow team-slick-next" aria-label="Next"><i class="fa fa-chevron-right"></i></button>',
                        dots: false,
                        autoplay: members.length > 3,
                        autoplaySpeed: 5000,
                        infinite: members.length > 3,
                        responsive: [
                            { breakpoint: 1024, settings: { slidesToShow: 3 } },
                            { breakpoint: 900, settings: { slidesToShow: 2 } },
                            { breakpoint: 767, settings: { slidesToShow: 1, arrows: true, dots: false } }
                        ]
                    });
                    console.log(`[CMS] Team members slider initialized with ${members.length} items.`);
                };
                setTimeout(initSlider, 300);
            })
            .catch(err => {
                console.error("Error fetching team members for support page:", err);
            });
    },

    initPremiumDownloadCards() {
        const isEditMode = this.isEditing;
        document.querySelectorAll('.premium-download-card').forEach(el => {
            const href = el.getAttribute('href') || '';
            const isEmpty = href === '#' || href === '' || href.trim() === 'javascript:void(0)';
            
            // Find parent column (col-md-4 or similar)
            const parentCol = el.closest('.dl-card-col');
            
            if (isEditMode) {
                if (parentCol) parentCol.style.display = '';
                if (isEmpty) {
                    el.style.border = '2px dashed rgba(255,255,255,0.18)';
                    el.style.background = 'rgba(255,255,255,0.02)';
                    el.style.opacity = '0.55';
                    el.setAttribute('title', 'Click to configure download (Upload PDF / Edit Title)');
                } else {
                    el.style.border = '';
                    el.style.background = '';
                    el.style.opacity = '';
                    el.removeAttribute('title');
                }
            } else {
                if (isEmpty) {
                    if (parentCol) parentCol.style.display = 'none';
                } else {
                    if (parentCol) parentCol.style.display = '';
                }
                el.style.border = '';
                el.style.background = '';
                el.style.opacity = '';
                el.removeAttribute('title');
            }
        });
    }

};

window.addEventListener('DOMContentLoaded', () => {
    CMS.init();
    // Initialize dashboard-specific listeners (e.g. for modals not yet rendered)
    // We wrap this in a tiny delay or call it when the specific tab is rendered
    // For simplicity, we can also use event delegation or call it frequently
    setInterval(() => CMS._initPasteListeners(), 2000); 
});







