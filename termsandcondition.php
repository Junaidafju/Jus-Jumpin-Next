<?php
/**
 * Name: Rules and Regulations
 * Template Name: Rules and Regulations
 *
 * The template for displaying the Rules & Regulations and Terms and Conditions page.
 * All styles are scoped under the .jjrr- namespace to avoid clashing with other
 * theme templates (e.g. the existing Terms and Conditions page).
 *
 * @package NewJusJumpin
 */

get_header();

// Attraction safety data. Each attraction: name, category key, age, height, weight, rules[]
$jj_attractions = array(
    // ---------------- TRAMPOLINES ----------------
    array(
        'name' => 'Infinity Trampoline',
        'cat' => 'trampolines',
        'age' => '3+ (children under 6 must be supervised)',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Health restrictions for this attraction also cover epilepsy and recent surgeries, in addition to the general park restrictions.',
            'Only one participant is allowed on each trampoline at a time.',
            'Land on both feet, knees slightly bent, to absorb impact.',
            'Do not attempt flips, somersaults, or tricks beyond your skill level.',
            'Do not jump from one trampoline to another.',
            'Do not sit, lie down, or crawl on the trampoline bed.',
            'Exit immediately after your session and keep the trampoline clear for the next participant.',
        )
    ),

    // ---------------- CLIMBING & HEIGHT ----------------
    array(
        'name' => 'Sky Stepper',
        'cat' => 'climbing',
        'age' => '6+',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Health restrictions for this attraction also cover balance disorders, in addition to the general park restrictions.',
            'Cross one step at a time while maintaining your balance.',
            'Hold the support ropes whenever provided.',
            'Allow the previous participant to finish before starting.',
            'Do not jump between steps or swing excessively.',
            'Maintain a safe distance from other participants.',
            'Exit immediately after completing the course.',
        )
    ),
    array(
        'name' => 'Obstacle Zone',
        'cat' => 'climbing',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Complete obstacles in the designated order.',
            'Only one participant per obstacle.',
            'Hold handrails wherever provided.',
            'No pushing or overtaking.',
            'Do not perform dangerous stunts.',
            'Use designated landing areas only.',
            'Exit immediately after completing the course.',
        )
    ),
    array(
        'name' => 'Hanging Bridge',
        'cat' => 'climbing',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Cross one participant at a time unless instructed otherwise.',
            'Hold both side ropes while crossing.',
            'Walk carefully without running.',
            'Maintain distance from the participant ahead.',
            'Do not shake or swing the bridge.',
            'No jumping on the bridge.',
            'Exit immediately after crossing.',
        )
    ),

    // ---------------- SLIDES ----------------
    array(
        'name' => 'Donut Slide',
        'cat' => 'slides',
        'age' => '6+',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Use only the provided donut tube.',
            'Sit properly on the donut tube and hold both handles firmly.',
            'Ensure the slide is clear before starting.',
            'Only one rider per tube unless instructed otherwise.',
            'Do not use your feet to slow down.',
            'Do not climb back up the slide.',
            'Leave the landing area immediately after finishing.',
        )
    ),
    array(
        'name' => 'Wave Slide',
        'cat' => 'slides',
        'age' => '3+',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Sit upright with legs extended while sliding.',
            'Only one participant may slide at a time.',
            'Keep a safe distance from the previous rider.',
            'Do not stop midway.',
            'Do not climb the slide from the bottom.',
            'Exit the landing area immediately.',
        )
    ),
    array(
        'name' => 'Tunnel Slide',
        'cat' => 'slides',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Sit facing forward with legs extended.',
            'Only one participant at a time.',
            'Ensure the exit is clear before sliding.',
            'Do not stop inside the tunnel.',
            'Do not climb backwards through the slide.',
            'No pushing at the entrance.',
            'Exit immediately after landing.',
        )
    ),

    // ---------------- THRILL RIDES ----------------
    array(
        'name' => 'Merry-Go-Round',
        'cat' => 'rides',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Sit properly before the ride begins.',
            'Hold the handles throughout the ride.',
            'Keep hands and feet inside the ride.',
            'Do not stand while the equipment is moving.',
            'Do not push or spin the ride excessively.',
            'Wait until the ride stops completely before getting off.',
            'One participant per designated seat.',
        )
    ),
    array(
        'name' => 'Swing',
        'cat' => 'rides',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Sit properly before swinging.',
            'Hold both chains or ropes firmly.',
            'Only one participant per swing.',
            'Do not jump off while moving.',
            'Keep clear of moving swings.',
            'Wait until the swing stops before getting off.',
            'Do not twist or wrap the chains.',
        )
    ),
    array(
        'name' => '360° Cycling',
        'cat' => 'rides',
        'age' => '6+',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Wear the provided safety harness correctly before starting.',
            'Only one participant may use the equipment at a time.',
            'Only staff may operate the equipment.',
            'Keep both hands on the handlebars throughout the ride.',
            'Do not unbuckle the harness until instructed by the marshal.',
            'Exit only after the equipment comes to a complete stop.',
        )
    ),

    // ---------------- ACTIVE PLAY ----------------
    array(
        'name' => 'Basketball Area',
        'cat' => 'active',
        'age' => 'All ages (under-6s must be supervised)',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Keep the playing area clear.',
            'Shoot only from the designated area.',
            'Do not hang or climb on the basketball hoop.',
            'Keep both feet on the ground while shooting.',
            'Do not throw balls at other participants.',
            'Avoid pushing or blocking others.',
            'Return basketballs after use.',
        )
    ),
    array(
        'name' => 'Pin Wall',
        'cat' => 'active',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Stand only in the designated position.',
            'Press your body gently against the pin wall.',
            'Keep fingers away from the sides of the pins.',
            'Only one participant at a time.',
            'Do not jump or run into the wall.',
            'Do not push other participants against the wall.',
            'Exit the activity area after use.',
        )
    ),
    array(
        'name' => 'Drop Stick Reflex Game',
        'cat' => 'active',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Stand within the designated play area.',
            'Catch only the stick assigned to your position.',
            'Keep your eyes on the dropping sticks at all times.',
            'Do not dive or jump aggressively.',
            'Do not interfere with other participants.',
            'Wait for the marshal\'s signal before each round.',
            'Return to the starting position after each attempt.',
        )
    ),

    // ---------------- SOFT PLAY & TODDLERS ----------------
    array(
        'name' => 'Sand Pit',
        'cat' => 'softplay',
        'age' => 'Children only (under-3s must be supervised)',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Keep the sand clean at all times.',
            'Remove shoes before entering if instructed.',
            'Do not throw sand at others.',
            'Keep sand away from eyes, ears and mouth.',
            'No running or rough play inside the sand pit.',
            'Wash or brush off sand before leaving the play area.',
        )
    ),
    array(
        'name' => 'Foam Pit',
        'cat' => 'softplay',
        'age' => 'All ages',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Remove all valuables before participating.',
            'Jump only from the designated platform.',
            'Ensure the foam pit is clear before jumping.',
            'Enter feet first, or land safely on your back or hips.',
            'Exit immediately after landing.',
            'Do not dive headfirst.',
            'Do not bury yourself beneath the foam cubes.',
            'No pushing or rough play.',
        )
    ),
    array(
        'name' => 'Toddler Play Area',
        'cat' => 'softplay',
        'age' => 'Toddlers only (adult supervision mandatory)',
        'height' => '',
        'weight' => '',
        'rules' => array(
            'Remove shoes before entering.',
            'No rough play.',
            'Do not climb outside designated play structures.',
            'Do not bring food or drinks into the play area.',
            'Keep toys inside the toddler zone.',
            'Report damaged equipment to staff immediately.',
        )
    ),
);

// Category labels, icons and accent colours, in render order.
$jj_categories = array(
    'slides' => array('label' => 'Slides', 'color' => '#1e88e5', 'icon' => '🛝'),
    'climbing' => array('label' => 'Climbing & Height Adventures', 'color' => '#d84315', 'icon' => '🧗'),
    'trampolines' => array('label' => 'Trampolines', 'color' => '#2e7d32', 'icon' => '🤸'),
    'rides' => array('label' => 'Thrill Rides', 'color' => '#6a1b9a', 'icon' => '🎢'),
    'active' => array('label' => 'Active Play', 'color' => '#00897b', 'icon' => '⚽'),
    'softplay' => array('label' => 'Soft Play & Toddler Zones', 'color' => '#f9a825', 'icon' => '🧸'),
);

// Terms & Conditions content, unchanged from the existing page.
$jj_terms = array(
    array('h' => 'Minimum Guest Requirement', 'p' => 'To book a party package, a minimum of 10 kids & 10 adults are required. In case minimum requirement for adults not met than 15 kids are mandatory for the birthday party.'),
    array('h' => 'Socks Policy', 'p' => 'To ensure safety, all guests must wear anti-skid socks in the play area. You may bring your own or purchase them at the counter.'),
    array('h' => 'Party Duration', 'p' => 'Party durations are determined based on the time slots available with a buffer period allocated for wrap-up. Exceeding the scheduled time may incur an additional charge depending on the overage. We will communicate the specific time slot and any potential overage charges clearly during the booking process.'),
    array('h' => 'Supervision', 'p' => 'While our staff provides general supervision within the play area, direct supervision of children remains the responsibility of parents or guardians. We kindly request that you ensure adequate supervision of children throughout the party.'),
    array('h' => 'Vendors and Decorations', 'p' => 'To maintain a consistent and safe environment, we do not permit outside photographers, vendors, or personal decorations. We offer various party enhancements and are happy to discuss options to personalize your event.'),
    array('h' => 'Food and Beverages', 'p' => 'For hygiene and safety reasons within the play zone, outside food and beverages are not permitted. We offer a diverse selection of food and beverage options on-site for your convenience.'),
    array('h' => 'Party Exclusivity', 'p' => 'A dedicated birthday party zone is allocated for celebrating a birthday party. The company does not provide exclusivity for the entire play/trampoline area.'),
    array('h' => 'Billing Policy', 'p' => 'Billing is based on the Minimum Guarantee (MG). Any agreed-upon changes to the MG, communicated via WhatsApp or other agreed-upon channels, will be considered final and reflected in the invoice.'),
    array('h' => 'Social Media Use', 'p' => 'By booking a party, you acknowledge that we may use photographs taken during the event for promotional purposes on our social media platforms. We respect your privacy and are happy to discuss any concerns you may have.'),
    array('h' => 'Safety Measures', 'p' => 'Guest safety is our utmost priority. All play equipment is regularly sanitized and maintained. We kindly request that all guests adhere to our safety instructions and guidelines.'),
    array('h' => 'Party Coordination', 'p' => 'Our dedicated party coordinator will be available to assist you throughout your event, ensuring a seamless and enjoyable experience. Please do not hesitate to contact them with any questions or special requests.'),
    array('h' => 'Liability and Damages', 'p' => 'Parents or guardians are responsible for any damages caused by their children or guests to the venue or equipment. We appreciate your cooperation in maintaining the venue\'s condition.'),
    array('h' => 'Additional Requests', 'p' => 'We are happy to consider special requests, such as additional food, themed decorations, or customized activities. Please inform us of these requests in advance, and we will do our best to accommodate them, subject to availability and feasibility.'),
    array('h' => 'Event Timing', 'p' => 'We kindly request that all guests arrive at least 15 minutes before the scheduled start time.'),
    array('h' => 'Amendments to Digital Invitation', 'p' => 'We are dedicated to delivering precise and required digital invitations. If any alternative or adjustments are required, clients must inform us at least 24 hours before the scheduled event time. Unfortunately, any adjustments being requested after this deadline may not be accomplished.'),
    array('h' => 'Policy Amendments and Enforcement', 'p' => 'Jus Jumpin reserves the right to amend, modify, or update these Terms and Conditions and any applicable policies at any time, with changes effective immediately upon posting on the premises, the company website, or by other reasonable notice.'),
);
?>

<main id="primary" class="site-main jjrr-page">

    <!-- ======================= HERO ======================= -->
    <section class="jjrr-hero">
        <div class="jjrr-hero-glow jjrr-hero-glow--one"></div>
        <div class="jjrr-hero-glow jjrr-hero-glow--two"></div>
        <div class="container jjrr-hero-inner">
            <span class="jjrr-eyebrow">Jus&rsquo; Jumpin&rsquo; &nbsp;&middot;&nbsp; Play Safe, Jump Happy</span>
            <h1>Rules &amp; Regulations</h1>
            <p>Every slide, wall, swing and trampoline has its own posted safety requirements.
                Read them here before you bounce in &mdash; and check the Terms &amp; Conditions
                for everything about booking and parties.</p>
            <div class="jjrr-hero-stats">
                <span><strong><?php echo count($jj_attractions); ?></strong> attractions covered</span>
                <span><strong>Staff&#8209;supervised</strong> at all times</span>
                <span><strong>Updated</strong> for the current season</span>
            </div>
        </div>
    </section>

    <!-- ======================= CONTENT ======================= -->
    <section class="jjrr-content">
        <div class="container">

            <!-- Quick navigation, overlapping the hero edge -->
            <nav class="jjrr-nav" aria-label="Section navigation">
                <a href="#jjrr-general-safety">General Safety</a>
                <?php foreach ($jj_categories as $cat_key => $cat): ?>
                    <a href="#jjrr-cat-<?php echo esc_attr($cat_key); ?>">
                        <span class="jjrr-nav-dot"
                            style="background:<?php echo esc_attr($cat['color']); ?>"></span><?php echo esc_html($cat['label']); ?>
                    </a>
                <?php endforeach; ?>
                <a href="#jjrr-terms">Terms &amp; Conditions</a>
            </nav>

            <!-- General safety, applies park-wide -->
            <div class="jjrr-card jjrr-general" id="jjrr-general-safety">
                <span class="jjrr-eyebrow jjrr-eyebrow--dark">Applies to every attraction</span>
                <h2>General Safety Guidelines</h2>
                <p class="jjrr-lede">These rules apply across the park, in addition to the specific requirements listed
                    for each attraction below.</p>

                <ul class="jjrr-general-list">
                    <li><span class="jjrr-tick">&#10003;</span>Follow on-site safety regulations and staff instructions
                        at all times to avoid hazards and keep everyone safe.</li>
                    <li><span class="jjrr-tick">&#10003;</span>No sharp, fragile or valuable items in the play area.
                        Please leave these with a member of your party or at the counter.</li>
                    <li><span class="jjrr-tick">&#10003;</span>Wear long sleeves and long trousers to prevent abrasions.
                        Avoid loose clothing (long dresses, drawstrings) and excessive accessories.</li>
                    <li><span class="jjrr-tick">&#10003;</span>Anti-skid socks are required in the play area &mdash;
                        bring your own or purchase a pair at the counter.</li>
                </ul>

                <div class="jjrr-health-note">
                    <strong>Health restrictions</strong>
                    <p>Our attractions are not suitable for pregnant guests, anyone with a fear of heights, intoxicated
                        guests, or those with hypertension, heart disease, respiratory conditions or limb injuries. If
                        you're unsure whether an attraction is right for you, please ask a member of our team.</p>
                </div>
            </div>

            <!-- Attractions, grouped by category -->
            <?php foreach ($jj_categories as $cat_key => $cat): ?>
                <div class="jjrr-category" id="jjrr-cat-<?php echo esc_attr($cat_key); ?>">
                    <div class="jjrr-category-head">
                        <span class="jjrr-category-icon"
                            style="background:<?php echo esc_attr($cat['color']); ?>1a; color:<?php echo esc_attr($cat['color']); ?>;"><?php echo esc_html($cat['icon']); ?></span>
                        <div>
                            <h2><?php echo esc_html($cat['label']); ?></h2>
                            <span class="jjrr-category-count">
                                <?php echo count(array_filter($jj_attractions, function ($a) use ($cat_key) {
                                    return $a['cat'] === $cat_key;
                                })); ?>
                                attractions
                            </span>
                        </div>
                    </div>

                    <div class="jjrr-grid">
                        <?php foreach ($jj_attractions as $attraction):
                            if ($attraction['cat'] !== $cat_key) {
                                continue;
                            }
                            ?>
                            <details class="jjrr-item" style="--jjrr-accent: <?php echo esc_attr($cat['color']); ?>;">
                                <summary>
                                    <span class="jjrr-item-title">
                                        <span class="jjrr-item-name"><?php echo esc_html($attraction['name']); ?></span>
                                        <span class="jjrr-chips">
                                            <span class="jjrr-chip">Age <?php echo esc_html($attraction['age']); ?></span>
                                            <?php if (!empty($attraction['height'])): ?>
                                                <span class="jjrr-chip jjrr-chip--warn">Min height
                                                    <?php echo esc_html($attraction['height']); ?></span>
                                            <?php endif; ?>
                                            <?php if (!empty($attraction['weight'])): ?>
                                                <span class="jjrr-chip">Weight
                                                    <?php echo esc_html($attraction['weight']); ?></span>
                                            <?php endif; ?>
                                        </span>
                                    </span>
                                    <span class="jjrr-caret" aria-hidden="true"></span>
                                </summary>
                                <div class="jjrr-item-body">
                                    <ol>
                                        <?php foreach ($attraction['rules'] as $rule): ?>
                                            <li><?php echo esc_html($rule); ?></li>
                                        <?php endforeach; ?>
                                    </ol>
                                    <p class="jjrr-item-footnote">Also subject to the General Safety Guidelines and health
                                        restrictions listed above.</p>
                                </div>
                            </details>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>

            <!-- Terms and Conditions -->
            <div class="jjrr-card jjrr-terms" id="jjrr-terms">
                <span class="jjrr-eyebrow jjrr-eyebrow--dark">Booking &amp; venue policies</span>
                <h2>Terms &amp; Conditions</h2>
                <p class="jjrr-lede">Please read these terms before booking a party or visiting Jus&rsquo;
                    Jumpin&rsquo;.</p>

                <div class="jjrr-terms-list">
                    <?php foreach ($jj_terms as $term): ?>
                        <div class="jjrr-terms-row">
                            <h3><?php echo esc_html($term['h']); ?></h3>
                            <p><?php echo esc_html($term['p']); ?></p>
                        </div>
                    <?php endforeach; ?>

                    <div class="jjrr-terms-row">
                        <h3>Contact Information</h3>
                        <p>Questions about the Terms of Service should be sent to us at <a
                                href="mailto:info@jusjumpin.com">info@jusjumpin.com</a></p>
                    </div>
                </div>
            </div>

        </div>
    </section>
</main>

<style>
    /* ============================================================
   Rules & Regulations — namespaced styles (prefix: jjrr-)
   Fully self-contained. Selectors are scoped under .jjrr-page
   so nothing here can leak onto or be overridden by other
   templates (including the existing Terms and Conditions page).
   ============================================================ */

    .jjrr-page {
        --jjrr-green: #2e7d32;
        --jjrr-green-dark: #1b5e20;
        --jjrr-green-light: #43a047;
        --jjrr-amber: #f9a825;
        --jjrr-ink: #1f2a24;
        --jjrr-text: #5a6b63;
        --jjrr-bg: #f5f9f5;
        --jjrr-card: #ffffff;
        --jjrr-line: #e3ece3;
        background: var(--jjrr-bg);
    }

    .jjrr-page * {
        box-sizing: border-box;
    }

    /* ---------- Hero ---------- */
    .jjrr-page .jjrr-hero {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, var(--jjrr-green-dark) 0%, var(--jjrr-green) 55%, var(--jjrr-green-light) 100%);
        color: #fff;
        padding: 100px 0 130px;
        text-align: center;
    }

    .jjrr-page .jjrr-hero-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(4px);
        opacity: 0.18;
        pointer-events: none;
    }

    .jjrr-page .jjrr-hero-glow--one {
        width: 320px;
        height: 320px;
        background: #ffe08a;
        top: -120px;
        right: 6%;
    }

    .jjrr-page .jjrr-hero-glow--two {
        width: 220px;
        height: 220px;
        background: #ffffff;
        bottom: -100px;
        left: 8%;
    }

    .jjrr-page .jjrr-hero-inner {
        position: relative;
        z-index: 2;
        max-width: 760px;
        margin-top: 5%;
    }

    .jjrr-page .jjrr-eyebrow {
        display: inline-block;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #ffe9b3;
    }

    .jjrr-page .jjrr-eyebrow--dark {
        color: var(--jjrr-green);
    }

    .jjrr-page .jjrr-hero h1 {
        font-size: 3rem;
        font-weight: 800;
        margin: 14px 0 18px;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        color: whitesmoke;
    }

    .jjrr-page .jjrr-hero p {
        font-size: 1.15rem;
        line-height: 1.65;
        color: #eaf5ea;
        margin: 0 auto;
    }

    .jjrr-page .jjrr-hero-stats {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 30px;
    }

    .jjrr-page .jjrr-hero-stats span {
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.28);
        padding: 8px 16px;
        border-radius: 100px;
        font-size: 0.85rem;
        color: #f2fbf2;
    }

    .jjrr-page .jjrr-hero-stats strong {
        color: #ffe08a;
    }

    /* ---------- Content wrapper ---------- */
    .jjrr-page .jjrr-content {
        padding: 0 0 90px;
    }

    .jjrr-page .jjrr-content .container {
        max-width: 980px;
    }

    /* ---------- Quick nav ---------- */
    .jjrr-page .jjrr-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        background: var(--jjrr-card);
        border-radius: 16px;
        padding: 16px 18px;
        box-shadow: 0 20px 45px -22px rgba(27, 94, 32, 0.35);
        margin-top: -60px;
        margin-bottom: 40px;
        position: relative;
        z-index: 3;
    }

    .jjrr-page .jjrr-nav a {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 14px;
        border-radius: 100px;
        background: #f3f7f3;
        color: var(--jjrr-ink);
        font-weight: 600;
        font-size: 0.83rem;
        text-decoration: none;
        transition: background 0.15s ease, color 0.15s ease;
    }

    .jjrr-page .jjrr-nav a:hover {
        background: var(--jjrr-green);
        color: #fff;
    }

    .jjrr-page .jjrr-nav-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        flex: 0 0 auto;
    }

    /* ---------- Shared card shell ---------- */
    .jjrr-page .jjrr-card {
        background: var(--jjrr-card);
        border-radius: 20px;
        padding: 40px 44px;
        box-shadow: 0 14px 40px -26px rgba(27, 94, 32, 0.3);
        border: 1px solid var(--jjrr-line);
        margin-bottom: 44px;
    }

    .jjrr-page .jjrr-card h2 {
        font-size: 1.7rem;
        font-weight: 800;
        color: var(--jjrr-ink);
        margin: 6px 0 10px;
    }

    .jjrr-page .jjrr-lede {
        color: var(--jjrr-text);
        font-size: 1rem;
        max-width: 65ch;
        margin: 0 0 8px;
    }

    /* ---------- General safety card ---------- */
    .jjrr-page .jjrr-general-list {
        list-style: none;
        margin: 20px 0 0;
        padding: 0;
    }

    .jjrr-page .jjrr-general-list li {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 13px 0;
        border-bottom: 1px dashed var(--jjrr-line);
        color: var(--jjrr-ink);
        font-size: 1rem;
        line-height: 1.6;
    }

    .jjrr-page .jjrr-general-list li:last-child {
        border-bottom: none;
    }

    .jjrr-page .jjrr-tick {
        flex: 0 0 auto;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #e6f4e6;
        color: var(--jjrr-green);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 800;
    }

    .jjrr-page .jjrr-health-note {
        margin-top: 22px;
        padding: 18px 20px;
        border-radius: 14px;
        background: #fff4e5;
        border: 1px solid #ffdca3;
    }

    .jjrr-page .jjrr-health-note strong {
        display: block;
        color: #b35c00;
        font-size: 0.92rem;
        margin-bottom: 4px;
    }

    .jjrr-page .jjrr-health-note p {
        margin: 0;
        color: #7a4a00;
        font-size: 0.94rem;
        line-height: 1.6;
    }

    /* ---------- Category blocks ---------- */
    .jjrr-page .jjrr-category {
        margin-bottom: 46px;
    }

    .jjrr-page .jjrr-category-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 18px;
    }

    .jjrr-page .jjrr-category-icon {
        flex: 0 0 auto;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
    }

    .jjrr-page .jjrr-category-head h2 {
        font-size: 1.3rem;
        font-weight: 800;
        color: var(--jjrr-ink);
        margin: 0;
    }

    .jjrr-page .jjrr-category-count {
        font-size: 0.8rem;
        color: var(--jjrr-text);
        font-weight: 600;
    }

    /* ---------- Attraction grid & cards ---------- */
    .jjrr-page .jjrr-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    @media (max-width: 760px) {
        .jjrr-page .jjrr-grid {
            grid-template-columns: 1fr;
        }
    }

    .jjrr-page .jjrr-item {
        background: var(--jjrr-card);
        border-radius: 16px;
        border: 1px solid var(--jjrr-line);
        border-top: 3px solid var(--jjrr-accent, var(--jjrr-green));
        box-shadow: 0 10px 26px -22px rgba(27, 94, 32, 0.35);
        overflow: hidden;
        transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    .jjrr-page .jjrr-item:hover {
        box-shadow: 0 16px 34px -20px rgba(27, 94, 32, 0.4);
        transform: translateY(-2px);
    }

    .jjrr-page .jjrr-item>summary {
        list-style: none;
        cursor: pointer;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
    }

    .jjrr-page .jjrr-item>summary::-webkit-details-marker {
        display: none;
    }

    .jjrr-page .jjrr-item-title {
        display: flex;
        flex-direction: column;
        gap: 9px;
    }

    .jjrr-page .jjrr-item-name {
        font-weight: 800;
        color: var(--jjrr-ink);
        font-size: 1.04rem;
    }

    .jjrr-page .jjrr-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .jjrr-page .jjrr-chip {
        font-size: 0.71rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 100px;
        background: #eef2f0;
        color: #33473e;
    }

    .jjrr-page .jjrr-chip--warn {
        background: #fdeceb;
        color: #c1440e;
    }

    .jjrr-page .jjrr-caret {
        flex: 0 0 auto;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #f1f4f1;
        position: relative;
        transition: transform 0.2s ease, background 0.2s ease;
    }

    .jjrr-page .jjrr-caret::before,
    .jjrr-page .jjrr-caret::after {
        content: "";
        position: absolute;
        background: var(--jjrr-ink);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .jjrr-page .jjrr-caret::before {
        width: 10px;
        height: 2px;
    }

    .jjrr-page .jjrr-caret::after {
        width: 2px;
        height: 10px;
    }

    .jjrr-page .jjrr-item[open] .jjrr-caret {
        background: var(--jjrr-accent, var(--jjrr-green));
        transform: rotate(45deg);
    }

    .jjrr-page .jjrr-item[open] .jjrr-caret::before,
    .jjrr-page .jjrr-item[open] .jjrr-caret::after {
        background: #fff;
    }

    .jjrr-page .jjrr-item-body {
        padding: 0 20px 22px;
        border-top: 1px solid var(--jjrr-line);
    }

    .jjrr-page .jjrr-item-body ol {
        margin: 15px 0 0;
        padding-left: 20px;
    }

    .jjrr-page .jjrr-item-body li {
        margin-bottom: 9px;
        color: var(--jjrr-text);
        font-size: 0.92rem;
        line-height: 1.6;
    }

    .jjrr-page .jjrr-item-footnote {
        margin-top: 15px;
        font-size: 0.8rem;
        color: #8a988f;
        background: #f5f9f5;
        padding: 10px 13px;
        border-radius: 10px;
    }

    /* ---------- Terms & Conditions card ---------- */
    .jjrr-page .jjrr-terms-list {
        margin-top: 10px;
    }

    .jjrr-page .jjrr-terms-row {
        padding: 22px 0;
        border-bottom: 1px solid var(--jjrr-line);
    }

    .jjrr-page .jjrr-terms-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .jjrr-page .jjrr-terms-row h3 {
        color: var(--jjrr-green);
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0 0 8px;
    }

    .jjrr-page .jjrr-terms-row p {
        color: var(--jjrr-text);
        line-height: 1.75;
        font-size: 1rem;
        margin: 0;
    }

    .jjrr-page .jjrr-terms-row a {
        color: var(--jjrr-green);
        font-weight: 600;
        text-decoration: none;
    }

    .jjrr-page .jjrr-terms-row a:hover {
        text-decoration: underline;
    }

    /* ---------- Responsive ---------- */
    @media (max-width: 768px) {
        .jjrr-page .jjrr-hero {
            padding: 70px 0 110px;
        }

        .jjrr-page .jjrr-hero h1 {
            font-size: 2.1rem;
        }

        .jjrr-page .jjrr-hero p {
            font-size: 1.02rem;
        }

        .jjrr-page .jjrr-nav {
            overflow-x: auto;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
            margin-top: -40px;
        }

        .jjrr-page .jjrr-nav a {
            white-space: nowrap;
        }

        .jjrr-page .jjrr-card {
            padding: 28px 22px;
        }

        .jjrr-page .jjrr-category-head {
            align-items: flex-start;
        }
    }
</style>

<?php
get_footer();