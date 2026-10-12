<?php
/**
 * Template Name: Safety Guidelines
 *
 * The template for displaying the Safety Guidelines page.
 * Covers park-wide safety: supervision, preparation, behaviour, health,
 * hygiene and what to do in an emergency. Attraction-specific rules stay on
 * the Rules & Regulations page; this page links to it rather than repeating it.
 *
 * All styles are scoped under .jjsg-page so they cannot clash with other
 * theme templates.
 *
 * @package NewJusJumpin
 */

get_header();

// ---------------------------------------------------------------------------
// CONTENT (edit here; the markup below loops over these arrays)
// ---------------------------------------------------------------------------

// Link to the Rules & Regulations page. Change the slug if yours is different.
$jjsg_rules_url = home_url('/rules-and-regulations/');

// Four headline rules shown at the top.
$jjsg_essentials = array(
    array('icon' => '🧦', 'title' => 'Anti-skid socks on', 'text' => 'Required for everyone in the play area. Bring your own or buy a pair at the counter.'),
    array('icon' => '👀', 'title' => 'Parents stay watchful', 'text' => 'Our team supervises the park, but direct supervision of your child is always yours.'),
    array('icon' => '🎒', 'title' => 'Valuables stay out', 'text' => 'No sharp, fragile or valuable items in the play area. Leave them at the counter.'),
    array('icon' => '📣', 'title' => 'Listen to the team', 'text' => 'Follow staff and marshal instructions at all times, on every attraction.'),
);

// Supervision by age. Drawn from the age limits on the Rules & Regulations page.
$jjsg_supervision = array(
    array('who' => 'Toddlers', 'rule' => 'Toddler Play Area only, with an adult present throughout. Adult supervision is mandatory.'),
    array('who' => 'Under 3', 'rule' => 'Must be supervised in the Sand Pit.'),
    array('who' => 'Under 6', 'rule' => 'Must be supervised on the Infinity Trampoline and in the Basketball Area.'),
    array('who' => '3 and over', 'rule' => 'Can use the Infinity Trampoline and Wave Slide (under-6s supervised on the trampoline).'),
    array('who' => '6 and over', 'rule' => 'Can use the Sky Stepper, Donut Slide and 360° Cycling.'),
);

// Before you jump.
$jjsg_before = array(
    'Wear anti-skid socks. Bare feet and regular socks are not allowed in the play area.',
    'Wear long sleeves and long trousers to prevent abrasions.',
    'Avoid loose clothing such as long dresses and drawstrings, and skip heavy accessories.',
    'Remove watches, jewellery, hair clips with sharp edges, and anything that could scratch or catch.',
    'Empty pockets. Phones, keys and wallets stay with a member of your party or at the counter.',
    'Check the age, height and weight limits on the attraction before your child joins the queue.',
);

// On the floor: do / don't.
$jjsg_do = array(
    'Take turns and keep a safe distance from the person ahead.',
    'Land on both feet with knees slightly bent on the trampolines.',
    'Hold ropes, handles and handrails wherever they are provided.',
    'Wait for the marshal\'s signal where an attraction needs one.',
    'Exit the landing area right after your turn.',
    'Tell a team member if anything looks damaged or unsafe.',
);
$jjsg_dont = array(
    'Run, push, pull or play rough with other guests.',
    'Attempt flips or tricks beyond your skill level.',
    'Climb on equipment in ways it was not designed for.',
    'Stop midway on a slide, bridge or course.',
    'Put more than one person on a single trampoline, swing or seat.',
    'Bring outside food or drink into the play zone.',
);

// Health.
$jjsg_health = array(
    'Pregnant guests',
    'Anyone with a fear of heights',
    'Intoxicated guests',
    'Hypertension or heart disease',
    'Respiratory conditions',
    'Limb injuries',
);

// Parents & guardians.
$jjsg_parents = array(
    array('h' => 'Supervise your child', 'p' => 'Staff keep watch over the park, but you remain responsible for your child\'s behaviour and wellbeing. Please stay within sight of them while they play.'),
    array('h' => 'Know your child\'s limits', 'p' => 'Choose attractions that suit their age and ability. If your child is nervous, let them watch first. Never push a child to try something they are unsure about.'),
    array('h' => 'Share what we should know', 'p' => 'Tell a team member about any medical condition, allergy or recent injury that could affect how your child plays.'),
    array('h' => 'Keep a plan for the group', 'p' => 'If you are attending a party, agree on a meeting point and make sure every adult knows which children they are responsible for.'),
);

// Hygiene.
$jjsg_hygiene = array(
    'Play equipment is regularly sanitized and maintained by our team.',
    'Please do not come to the park if your child is unwell or has an infectious illness.',
    'Wash or sanitize hands before eating and after using the washroom.',
    'No outside food or drink in the play zone. Food and beverages are available on site.',
    'Keep sand, foam cubes and toys inside their designated areas.',
);

// In an emergency.
$jjsg_emergency = array(
    array('h' => 'Someone is hurt', 'p' => 'Stop play and tell the nearest team member or marshal straight away, even if the injury looks small. Please do not move a child who may have hurt their neck, back or head.'),
    array('h' => 'A child is missing', 'p' => 'Tell any team member immediately. Stay calm and give them your child\'s name, age and what they are wearing.'),
    array('h' => 'Equipment looks damaged', 'p' => 'Move away from it and report it to staff. Do not try to fix or use it.'),
    array('h' => 'You see unsafe behaviour', 'p' => 'Let a marshal know. We would rather hear about it early than after someone is hurt.'),
);
?>

<main id="primary" class="site-main jjsg-page">

    <!-- ======================= HERO ======================= -->
    <section class="jjsg-hero">
        <div class="jjsg-hero-glow jjsg-hero-glow--one"></div>
        <div class="jjsg-hero-glow jjsg-hero-glow--two"></div>
        <div class="container jjsg-hero-inner">
            <h1>Safety Guidelines</h1>
            <p>Great play starts with safe play. Here is how we keep every jump, slide and climb fun for children
                and calm for parents &mdash; and what we ask of you in return.</p>
        </div>
    </section>

    <!-- ======================= CONTENT ======================= -->
    <section class="jjsg-content">
        <div class="container">

            <!-- Quick navigation -->
            <nav class="jjsg-nav" aria-label="Section navigation">
                <a href="#jjsg-essentials">The basics</a>
                <a href="#jjsg-supervision">Supervision by age</a>
                <a href="#jjsg-before">Before you jump</a>
                <a href="#jjsg-floor">On the play floor</a>
                <a href="#jjsg-health">Health</a>
                <a href="#jjsg-parents">For parents</a>
                <a href="#jjsg-hygiene">Hygiene</a>
                <a href="#jjsg-emergency">If something happens</a>
            </nav>

            <!-- The basics -->
            <div class="jjsg-block" id="jjsg-essentials">
                <h2>The basics</h2>
                <p class="jjsg-lede">Four things every guest needs to know before stepping onto the floor.</p>
                <div class="jjsg-essentials">
                    <?php foreach ($jjsg_essentials as $item): ?>
                        <div class="jjsg-essential">
                            <span class="jjsg-essential-icon" aria-hidden="true"><?php echo esc_html($item['icon']); ?></span>
                            <h3><?php echo esc_html($item['title']); ?></h3>
                            <p><?php echo esc_html($item['text']); ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Supervision by age -->
            <div class="jjsg-card" id="jjsg-supervision">
                <h2>Supervision by age</h2>
                <p class="jjsg-lede">Age limits are set per attraction. This is a quick guide to the most important ones.
                    The full list is on our <a href="<?php echo esc_url($jjsg_rules_url); ?>">Rules &amp; Regulations</a> page.</p>
                <dl class="jjsg-age-list">
                    <?php foreach ($jjsg_supervision as $row): ?>
                        <div class="jjsg-age-row">
                            <dt><?php echo esc_html($row['who']); ?></dt>
                            <dd><?php echo esc_html($row['rule']); ?></dd>
                        </div>
                    <?php endforeach; ?>
                </dl>
            </div>

            <!-- Before you jump -->
            <div class="jjsg-card" id="jjsg-before">
                <h2>Before you jump</h2>
                <p class="jjsg-lede">A minute of preparation at the counter prevents most scrapes and slips.</p>
                <ul class="jjsg-tick-list">
                    <?php foreach ($jjsg_before as $line): ?>
                        <li><span class="jjsg-tick" aria-hidden="true">&#10003;</span><?php echo esc_html($line); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <!-- On the play floor -->
            <div class="jjsg-block" id="jjsg-floor">
                <h2>On the play floor</h2>
                <p class="jjsg-lede">Simple habits that keep everyone safe, whatever the attraction.</p>
                <div class="jjsg-split">
                    <div class="jjsg-panel jjsg-panel--do">
                        <h3>Do</h3>
                        <ul>
                            <?php foreach ($jjsg_do as $line): ?>
                                <li><span class="jjsg-mark" aria-hidden="true">&#10003;</span><?php echo esc_html($line); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <div class="jjsg-panel jjsg-panel--dont">
                        <h3>Don&rsquo;t</h3>
                        <ul>
                            <?php foreach ($jjsg_dont as $line): ?>
                                <li><span class="jjsg-mark" aria-hidden="true">&#10005;</span><?php echo esc_html($line); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Health -->
            <div class="jjsg-card" id="jjsg-health">
                <h2>Health and fitness to play</h2>
                <p class="jjsg-lede">Our attractions are physical. They are not suitable for:</p>
                <ul class="jjsg-pills">
                    <?php foreach ($jjsg_health as $line): ?>
                        <li><?php echo esc_html($line); ?></li>
                    <?php endforeach; ?>
                </ul>
                <div class="jjsg-note jjsg-note--amber">
                    <strong>Extra limits on some attractions</strong>
                    <p>The Infinity Trampoline also excludes guests with epilepsy or recent surgeries, and the Sky Stepper
                        excludes guests with balance disorders. If you are unsure whether an attraction is right for you
                        or your child, please ask a member of our team before playing.</p>
                </div>
            </div>

            <!-- For parents -->
            <div class="jjsg-block" id="jjsg-parents">
                <h2>For parents and guardians</h2>
                <p class="jjsg-lede">We look after the equipment and the floor. You know your child best.</p>
                <div class="jjsg-parent-grid">
                    <?php foreach ($jjsg_parents as $item): ?>
                        <div class="jjsg-parent">
                            <h3><?php echo esc_html($item['h']); ?></h3>
                            <p><?php echo esc_html($item['p']); ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Hygiene -->
            <div class="jjsg-card" id="jjsg-hygiene">
                <h2>Hygiene and cleanliness</h2>
                <ul class="jjsg-tick-list">
                    <?php foreach ($jjsg_hygiene as $line): ?>
                        <li><span class="jjsg-tick" aria-hidden="true">&#10003;</span><?php echo esc_html($line); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <!-- Emergencies -->
            <div class="jjsg-card jjsg-card--alert" id="jjsg-emergency">
                <h2>If something happens</h2>
                <p class="jjsg-lede">Tell the nearest team member or marshal first. They are trained to help and know what to do next.</p>
                <div class="jjsg-emergency-list">
                    <?php foreach ($jjsg_emergency as $item): ?>
                        <div class="jjsg-emergency-row">
                            <h3><?php echo esc_html($item['h']); ?></h3>
                            <p><?php echo esc_html($item['p']); ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Contact -->
            <div class="jjsg-contact">
                <div>
                    <h2>Questions about safety?</h2>
                    <p>Ask any team member on the floor, or get in touch before your visit.</p>
                </div>
                <div class="jjsg-contact-links">
                    <a href="tel:+919874206206">Call +91 9874206206</a>
                    <a href="mailto:info@jusjumpin.com">info@jusjumpin.com</a>
                </div>
            </div>

            <p class="jjsg-footnote">These guidelines work alongside our
                <a href="<?php echo esc_url($jjsg_rules_url); ?>">Rules &amp; Regulations</a> and Terms &amp; Conditions.
                Jus Jumpin may update them at any time, with changes effective immediately upon posting.</p>

        </div>
    </section>
</main>

<style>
    /* ============================================================
   Safety Guidelines: namespaced styles (prefix: jjsg-)
   Scoped under .jjsg-page so nothing leaks to or from other
   templates. Uses the same green palette as the Rules &
   Regulations and Privacy Policy pages.
   ============================================================ */

    .jjsg-page {
        --jjsg-green: #2e7d32;
        --jjsg-green-dark: #1b5e20;
        --jjsg-green-light: #43a047;
        --jjsg-amber: #f9a825;
        --jjsg-red: #c1440e;
        --jjsg-ink: #1f2a24;
        --jjsg-text: #5a6b63;
        --jjsg-bg: #f5f9f5;
        --jjsg-card: #ffffff;
        --jjsg-line: #e3ece3;
        background: var(--jjsg-bg);
    }

    .jjsg-page * {
        box-sizing: border-box;
    }

    .jjsg-page a {
        color: var(--jjsg-green);
        font-weight: 600;
        text-decoration: none;
    }

    .jjsg-page a:hover {
        text-decoration: underline;
    }

    .jjsg-page a:focus-visible {
        outline: 3px solid var(--jjsg-amber);
        outline-offset: 2px;
        border-radius: 4px;
    }

    /* ---------- Hero ---------- */
    .jjsg-page .jjsg-hero {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, var(--jjsg-green-dark) 0%, var(--jjsg-green) 55%, var(--jjsg-green-light) 100%);
        color: #fff;
        padding: 100px 0 130px;
        text-align: center;
    }

    .jjsg-page .jjsg-hero-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(4px);
        opacity: 0.18;
        pointer-events: none;
    }

    .jjsg-page .jjsg-hero-glow--one {
        width: 320px;
        height: 320px;
        background: #ffe08a;
        top: -120px;
        right: 6%;
    }

    .jjsg-page .jjsg-hero-glow--two {
        width: 220px;
        height: 220px;
        background: #ffffff;
        bottom: -100px;
        left: 8%;
    }

    .jjsg-page .jjsg-hero-inner {
        position: relative;
        z-index: 2;
        max-width: 760px;
        margin-top: 5%;
    }

    .jjsg-page .jjsg-hero h1 {
        font-size: 3rem;
        font-weight: 800;
        margin: 0 0 18px;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        color: whitesmoke;
    }

    .jjsg-page .jjsg-hero p {
        font-size: 1.15rem;
        line-height: 1.65;
        color: #eaf5ea;
        margin: 0 auto;
    }

    /* ---------- Content wrapper ---------- */
    .jjsg-page .jjsg-content {
        padding: 0 0 90px;
    }

    .jjsg-page .jjsg-content .container {
        max-width: 980px;
    }

    /* ---------- Quick nav ---------- */
    .jjsg-page .jjsg-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        background: var(--jjsg-card);
        border-radius: 16px;
        padding: 16px 18px;
        box-shadow: 0 20px 45px -22px rgba(27, 94, 32, 0.35);
        margin-top: -60px;
        margin-bottom: 44px;
        position: relative;
        z-index: 3;
    }

    .jjsg-page .jjsg-nav a {
        display: inline-flex;
        align-items: center;
        padding: 8px 14px;
        border-radius: 100px;
        background: #f3f7f3;
        color: var(--jjsg-ink);
        font-weight: 600;
        font-size: 0.83rem;
        text-decoration: none;
        transition: background 0.15s ease, color 0.15s ease;
    }

    .jjsg-page .jjsg-nav a:hover {
        background: var(--jjsg-green);
        color: #fff;
        text-decoration: none;
    }

    /* ---------- Shared ---------- */
    .jjsg-page .jjsg-block {
        margin-bottom: 44px;
        scroll-margin-top: 90px;
    }

    .jjsg-page .jjsg-card {
        background: var(--jjsg-card);
        border-radius: 20px;
        padding: 40px 44px;
        box-shadow: 0 14px 40px -26px rgba(27, 94, 32, 0.3);
        border: 1px solid var(--jjsg-line);
        margin-bottom: 44px;
        scroll-margin-top: 90px;
    }

    .jjsg-page .jjsg-block>h2,
    .jjsg-page .jjsg-card>h2 {
        font-size: 1.7rem;
        font-weight: 800;
        color: var(--jjsg-ink);
        margin: 0 0 10px;
    }

    .jjsg-page .jjsg-lede {
        color: var(--jjsg-text);
        font-size: 1rem;
        line-height: 1.7;
        max-width: 65ch;
        margin: 0 0 22px;
    }

    /* ---------- The basics ---------- */
    .jjsg-page .jjsg-essentials {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }

    .jjsg-page .jjsg-essential {
        background: var(--jjsg-card);
        border: 1px solid var(--jjsg-line);
        border-top: 3px solid var(--jjsg-green);
        border-radius: 16px;
        padding: 22px 18px;
    }

    .jjsg-page .jjsg-essential-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background: #e6f4e6;
        font-size: 1.4rem;
        margin-bottom: 14px;
    }

    .jjsg-page .jjsg-essential h3 {
        font-size: 1.02rem;
        font-weight: 800;
        color: var(--jjsg-ink);
        margin: 0 0 6px;
    }

    .jjsg-page .jjsg-essential p {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--jjsg-text);
        margin: 0;
    }

    /* ---------- Supervision by age ---------- */
    .jjsg-page .jjsg-age-list {
        margin: 0;
    }

    .jjsg-page .jjsg-age-row {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 20px;
        align-items: baseline;
        padding: 16px 0;
        border-bottom: 1px dashed var(--jjsg-line);
    }

    .jjsg-page .jjsg-age-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .jjsg-page .jjsg-age-row dt {
        font-weight: 800;
        color: var(--jjsg-green);
        font-size: 1.02rem;
    }

    .jjsg-page .jjsg-age-row dd {
        margin: 0;
        color: var(--jjsg-ink);
        line-height: 1.6;
    }

    /* ---------- Tick lists ---------- */
    .jjsg-page .jjsg-tick-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .jjsg-page .jjsg-tick-list li {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 13px 0;
        border-bottom: 1px dashed var(--jjsg-line);
        color: var(--jjsg-ink);
        line-height: 1.6;
    }

    .jjsg-page .jjsg-tick-list li:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .jjsg-page .jjsg-tick {
        flex: 0 0 auto;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #e6f4e6;
        color: var(--jjsg-green);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 800;
    }

    /* ---------- Do / Don't ---------- */
    .jjsg-page .jjsg-split {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .jjsg-page .jjsg-panel {
        border-radius: 18px;
        padding: 26px 26px 22px;
        border: 1px solid var(--jjsg-line);
        background: var(--jjsg-card);
    }

    .jjsg-page .jjsg-panel--do {
        border-top: 3px solid var(--jjsg-green);
    }

    .jjsg-page .jjsg-panel--dont {
        border-top: 3px solid var(--jjsg-red);
    }

    .jjsg-page .jjsg-panel h3 {
        font-size: 1.2rem;
        font-weight: 800;
        margin: 0 0 12px;
        color: var(--jjsg-ink);
    }

    .jjsg-page .jjsg-panel ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .jjsg-page .jjsg-panel li {
        display: flex;
        gap: 11px;
        align-items: flex-start;
        padding: 9px 0;
        color: var(--jjsg-text);
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .jjsg-page .jjsg-mark {
        flex: 0 0 auto;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        font-weight: 800;
        margin-top: 2px;
    }

    .jjsg-page .jjsg-panel--do .jjsg-mark {
        background: #e6f4e6;
        color: var(--jjsg-green);
    }

    .jjsg-page .jjsg-panel--dont .jjsg-mark {
        background: #fdeceb;
        color: var(--jjsg-red);
    }

    /* ---------- Health ---------- */
    .jjsg-page .jjsg-pills {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .jjsg-page .jjsg-pills li {
        padding: 9px 16px;
        border-radius: 100px;
        background: #fff4e5;
        border: 1px solid #ffdca3;
        color: #7a4a00;
        font-weight: 600;
        font-size: 0.92rem;
    }

    .jjsg-page .jjsg-note {
        margin-top: 24px;
        padding: 18px 20px;
        border-radius: 14px;
    }

    .jjsg-page .jjsg-note--amber {
        background: #fff4e5;
        border: 1px solid #ffdca3;
    }

    .jjsg-page .jjsg-note strong {
        display: block;
        color: #b35c00;
        font-size: 0.95rem;
        margin-bottom: 4px;
    }

    .jjsg-page .jjsg-note p {
        margin: 0;
        color: #7a4a00;
        font-size: 0.94rem;
        line-height: 1.6;
    }

    /* ---------- Parents ---------- */
    .jjsg-page .jjsg-parent-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .jjsg-page .jjsg-parent {
        background: var(--jjsg-card);
        border: 1px solid var(--jjsg-line);
        border-left: 4px solid var(--jjsg-green);
        border-radius: 14px;
        padding: 22px 24px;
    }

    .jjsg-page .jjsg-parent h3 {
        font-size: 1.08rem;
        font-weight: 700;
        color: var(--jjsg-green);
        margin: 0 0 8px;
    }

    .jjsg-page .jjsg-parent p {
        margin: 0;
        color: var(--jjsg-text);
        line-height: 1.7;
        font-size: 0.95rem;
    }

    /* ---------- Emergency ---------- */
    .jjsg-page .jjsg-card--alert {
        border-top: 4px solid var(--jjsg-red);
    }

    .jjsg-page .jjsg-emergency-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
    }

    .jjsg-page .jjsg-emergency-row {
        background: #fdf6f4;
        border: 1px solid #f6d9d0;
        border-radius: 14px;
        padding: 20px 22px;
    }

    .jjsg-page .jjsg-emergency-row h3 {
        font-size: 1.05rem;
        font-weight: 800;
        color: var(--jjsg-red);
        margin: 0 0 8px;
    }

    .jjsg-page .jjsg-emergency-row p {
        margin: 0;
        color: #5b3a30;
        font-size: 0.94rem;
        line-height: 1.65;
    }

    /* ---------- Contact ---------- */
    .jjsg-page .jjsg-contact {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
        background: linear-gradient(135deg, var(--jjsg-green-dark), var(--jjsg-green));
        border-radius: 20px;
        padding: 34px 40px;
        color: #fff;
        margin-bottom: 28px;
    }

    .jjsg-page .jjsg-contact h2 {
        font-size: 1.4rem;
        font-weight: 800;
        margin: 0 0 6px;
        color: #fff;
    }

    .jjsg-page .jjsg-contact p {
        margin: 0;
        color: #dff0df;
    }

    .jjsg-page .jjsg-contact-links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .jjsg-page .jjsg-contact-links a {
        display: inline-block;
        padding: 12px 20px;
        border-radius: 100px;
        background: #fff;
        color: var(--jjsg-green-dark);
        font-weight: 700;
        font-size: 0.92rem;
    }

    .jjsg-page .jjsg-contact-links a:hover {
        background: #ffe08a;
        text-decoration: none;
    }

    .jjsg-page .jjsg-footnote {
        color: #8a988f;
        font-size: 0.85rem;
        line-height: 1.7;
        text-align: center;
        max-width: 70ch;
        margin: 0 auto;
    }

    /* ---------- Responsive ---------- */
    @media (max-width: 900px) {
        .jjsg-page .jjsg-essentials {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 768px) {
        .jjsg-page .jjsg-hero {
            padding: 70px 0 110px;
        }

        .jjsg-page .jjsg-hero h1 {
            font-size: 2.1rem;
        }

        .jjsg-page .jjsg-hero p {
            font-size: 1.02rem;
        }

        .jjsg-page .jjsg-nav {
            overflow-x: auto;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
            margin-top: -40px;
        }

        .jjsg-page .jjsg-nav a {
            white-space: nowrap;
        }

        .jjsg-page .jjsg-card {
            padding: 28px 22px;
        }

        .jjsg-page .jjsg-split,
        .jjsg-page .jjsg-parent-grid,
        .jjsg-page .jjsg-emergency-list {
            grid-template-columns: 1fr;
        }

        .jjsg-page .jjsg-age-row {
            grid-template-columns: 1fr;
            gap: 4px;
        }

        .jjsg-page .jjsg-contact {
            padding: 28px 24px;
        }
    }

    @media (max-width: 520px) {
        .jjsg-page .jjsg-essentials {
            grid-template-columns: 1fr;
        }
    }
</style>

<?php
get_footer();
