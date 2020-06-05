--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_fk1;
ALTER TABLE ONLY public.products DROP CONSTRAINT products_fk0;
ALTER TABLE ONLY public."productStyle" DROP CONSTRAINT "productStyle_fk0";
ALTER TABLE ONLY public."productImages" DROP CONSTRAINT "productImages_fk2";
ALTER TABLE ONLY public."productImages" DROP CONSTRAINT "productImages_fk1";
ALTER TABLE ONLY public."productImages" DROP CONSTRAINT "productImages_fk0";
ALTER TABLE ONLY public.sizes DROP CONSTRAINT sizes_pk;
ALTER TABLE ONLY public.sizes DROP CONSTRAINT sizes_name_key;
ALTER TABLE ONLY public.sizes DROP CONSTRAINT sizes_abbreviation_key;
ALTER TABLE ONLY public.promos DROP CONSTRAINT promo_pk;
ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public."productStyle" DROP CONSTRAINT "productStyle_pk";
ALTER TABLE ONLY public."productImages" DROP CONSTRAINT "productImages_pkey";
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.colors DROP CONSTRAINT colors_pk;
ALTER TABLE ONLY public.colors DROP CONSTRAINT colors_name_key;
ALTER TABLE ONLY public.colors DROP CONSTRAINT colors_hex_key;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pk;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_pk;
ALTER TABLE public.sizes ALTER COLUMN "sizeId" DROP DEFAULT;
ALTER TABLE public.promos ALTER COLUMN "promoId" DROP DEFAULT;
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public."productStyle" ALTER COLUMN "styleId" DROP DEFAULT;
ALTER TABLE public."productImages" ALTER COLUMN "productImageId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.colors ALTER COLUMN "colorId" DROP DEFAULT;
ALTER TABLE public.categories ALTER COLUMN "categoryId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
ALTER TABLE public.brands ALTER COLUMN "brandId" DROP DEFAULT;
DROP SEQUENCE public.sizes_id_seq;
DROP TABLE public.sizes;
DROP SEQUENCE public.promo_id_seq;
DROP TABLE public.promos;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public."productsSizes";
DROP TABLE public."productsColors";
DROP TABLE public.products;
DROP SEQUENCE public."productStyle_styleId_seq";
DROP TABLE public."productStyle";
DROP SEQUENCE public."productImages_productImageId_seq";
DROP TABLE public."productImages";
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public.colors_id_seq;
DROP TABLE public.colors;
DROP SEQUENCE public.categories_id_seq;
DROP TABLE public.categories;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP SEQUENCE public.brands_id_seq;
DROP TABLE public.brands;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.brands (
    "brandId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands."brandId";


--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    "categoryId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories."categoryId";


--
-- Name: colors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.colors (
    "colorId" integer NOT NULL,
    name text NOT NULL,
    hex text NOT NULL
);


--
-- Name: colors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.colors_id_seq OWNED BY public.colors."colorId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: productImages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."productImages" (
    "productId" integer NOT NULL,
    "colorId" integer,
    "imagePath" text NOT NULL,
    "styleId" integer,
    "productImageId" integer NOT NULL
);


--
-- Name: productImages_productImageId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."productImages_productImageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: productImages_productImageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."productImages_productImageId_seq" OWNED BY public."productImages"."productImageId";


--
-- Name: productStyle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."productStyle" (
    "styleId" integer NOT NULL,
    "productId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: productStyle_styleId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."productStyle_styleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: productStyle_styleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."productStyle_styleId_seq" OWNED BY public."productStyle"."styleId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    description text NOT NULL,
    "categoryId" integer NOT NULL,
    "brandId" integer NOT NULL
);


--
-- Name: productsColors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."productsColors" (
    "productId" integer NOT NULL,
    "colorId" integer NOT NULL
);


--
-- Name: productsSizes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."productsSizes" (
    "productId" integer NOT NULL,
    "sizeId" integer NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: promos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promos (
    "promoId" integer NOT NULL,
    name text NOT NULL,
    "imagePath" text NOT NULL,
    url text NOT NULL
);


--
-- Name: promo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.promo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.promo_id_seq OWNED BY public.promos."promoId";


--
-- Name: sizes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sizes (
    "sizeId" integer NOT NULL,
    name text NOT NULL,
    abbreviation text NOT NULL
);


--
-- Name: sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sizes_id_seq OWNED BY public.sizes."sizeId";


--
-- Name: brands brandId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands ALTER COLUMN "brandId" SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: categories categoryId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN "categoryId" SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: colors colorId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors ALTER COLUMN "colorId" SET DEFAULT nextval('public.colors_id_seq'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: productImages productImageId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productImages" ALTER COLUMN "productImageId" SET DEFAULT nextval('public."productImages_productImageId_seq"'::regclass);


--
-- Name: productStyle styleId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productStyle" ALTER COLUMN "styleId" SET DEFAULT nextval('public."productStyle_styleId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Name: promos promoId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promos ALTER COLUMN "promoId" SET DEFAULT nextval('public.promo_id_seq'::regclass);


--
-- Name: sizes sizeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes ALTER COLUMN "sizeId" SET DEFAULT nextval('public.sizes_id_seq'::regclass);


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.brands ("brandId", name) FROM stdin;
1	Crown/Samducksa
2	Hori
3	Sanwa
4	Seimitsu
5	PhailBox
6	Qanba
7	Hitbox Arcade
8	MadCatz
9	Razer
10	SplitFrame
11	IST MALL
12	ETokki
13	FullStack
\.


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories ("categoryId", name) FROM stdin;
1	Push Buttons
2	Joy Sticks
3	Arcade Sticks
4	Hitbox
5	Apparel
6	Stick Bag
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.colors ("colorId", name, hex) FROM stdin;
1	black	#040603
2	blue	#11a1ff
3	green	#10ff20
4	pink	#fe6e83
5	red	#c10202
6	white	#eae3df
7	yellow	#fec101
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: productImages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."productImages" ("productId", "colorId", "imagePath", "styleId", "productImageId") FROM stdin;
\.


--
-- Data for Name: productStyle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."productStyle" ("styleId", "productId", name) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, description, "categoryId", "brandId") FROM stdin;
1	PhailBox Model-F	30000	The latest hitbox from the IP line. Compatible with buttons from all major brands. Uses nine 24mm buttons & 30mm buttons. Constructed out of 100% real Walnut wood with a polish finish. Made in the U.S.A.	4	5
2	PhailBox Model-K	30000	IP has done it again. This beautiful Japan influenced Hitbox will have everyone in awe. Constructed out of 100% real wood with a polish finish. Made in the U.S.A.	4	5
3	PhailBox Model-R	30000	One of IP's works. Made out of 100% real wood as always with a nice polish finish. Compatible with buttons from all major brands. Constructed out of 100% real Walnut and made in the U.S.A.	4	5
4	PhailBox Model-P	30000	The first hitbox that IP created. Not as modern looking as his other works but amazing nonetheless. Uses a standard keyboard layout. Compatible with buttons from all major brands.  Constructed out of 100% real Walnut wood with a polish finish. Made in the U.S.A.	4	5
5	The Original Hit Box	19999	The hitbox that started it all. The Hit Box is an all-button arcade controller designed to give you more deliberate control in fighting games.	4	7
6	Smash Box	19999	Smash Box is an all-button arcade controller designed to push the limits of what can be done with an analog controller and provide greater accessibility to all players. Initially created to play Super Smash Bros. Melee, the Smash Box easily shifts among all Smash games. In addition, because of its customization, it's great to use for other fighting games, platformers, racing, rhythm, and puzzle games - there's even players on Smash Box speedrunning some of your favorite games right now!	4	7
7	QANBA OBSIDIAN Arcade Stick PS4 / PS3 / PC	22500	Hot off the press with their Dragon flagship fight stick, Qanba rolls out another fight stick for the PS4 / PS3 and PC with the Obsidian.	3	6
8	Razer Panthera Evo Tournament Arcade Stick for PS4	20000	The Razer Panthera Evo is the successor to the Razer Panthera—with improved pushbuttons and speed using Razer Mechanical Switches, featuring shorter actuation points for ultra-fast response and an industry-leading durability of up to 30 million taps.	3	9
9	HORI Real Arcade Pro 4 Kai for PlayStation 4, PlayStation 3, and PC	20000	The Real Arcade Pro 4 Kai is a tournament-grade fighting stick that brings the arcade experience home. Now available in three new colors! Compatible with PlayStation 4, PlayStation 3 and Windows PC through XInput.	3	2
10	HORI Fighting Edge Arcade Fighting Stick	22500	The ultimate arcade stick that truly embraces the fighting game spirit is back on PlayStation 4. An industry-first brushed aluminum top panel provides durability and refined style found nowhere else.	3	2
11	Mad Catz Street Fighter V Arcade FightStick TE2+	25000	“Rise up” to the challenge! Continuing the legacy of the original te FightStick, the official Street Fighter V arcade FightStick TE2+ builds Premium Sanwa Denshi parts into a custom arcade stick that's always ready to fight. With an easy-open top panel, unprecedented level of personalization and a whole new set of Control Options, the Street Fighter V arcade FightStick Tournament Edition 2+ is ready to take your V-SKILL to the next level.	3	8
12	SEIMITSU LS-32-01 Joystick	2999	The LS-32-01 joystick is used in many arcade cabinets throughout Japan.  This is the competing stick to Sanwa Denshi's JLF-TP-8YT-SK.  The difference is this stick provides more resistance in motion than Sanwa Denshi's stick, for those who prefer a stiffer feedback.	2	4
13	Hori Hayabusa Silent Optical Joystick	7999	Introducing Hori's Silent Stick.  Using optical sensors, these provide the quietest and smoothest operation today.   Accurate, responsive, reliable.	2	2
14	CROWN CWL-303-DX Crazy Dongpal Joystick	3500	Similar to Helpme with his CWL-309 lever, Samducksa approached Tekken player Crazy Dongpal for his own lever. Designated as the CWL-303-DX Crazy Dongpal lever, this model is a different beast. This lever uses a smaller actuator different from the 309 levers which results in tighter diagonals. If you play Kazuya, Heihachi, Jin, or Devil Jin in Tekken, this means faster wavedashing is possible. Even then, the diagonal zone is still enough to do other moves efficiently.	2	1
15	Taeyoung Fanta Lever	4000	Among the growing family of Fanta levers now available, the Taeyoung Fanta is where is all started. The name 'Fanta stick' originated from Taeyoung Fanta, as it was used and popularized in South Korea's Fantasia Arcade of Tekken fame.  Find out why this model is respected among serious Tekken players.	2	12
16	Sanwa Denshi JLF Joystick	2500	Sanwa's premiere joystick is the de-facto standard in most Japanese arcade setups, and widely adopted in the Madcatz series of joysticks.  Works with a wide array of Sanwa balltops, battops and Seimitsu balltops, including the Seimitsu LB-39 Bubbletop, Sanwa LB-35 Balltop, and Sanwa LB-30 N-S Battop.	2	3
17	IST-ROX Knee Lever	6500	Back in early 2019, South Korea’s most popular Tekken player Knee has been testing his own signature lever in collaboration with IST and representing team ROX Dragons. With feedback from both Knee and team member Chanel, it’s now finally available for players to try out.	2	11
18	Sanwa Denshi (30mm) Solid Color SILENT Pushbutton (OBSFS30)	600	Continuing the tradition of the precision response that Sanwa Denshi is known for, they continue to release new products that not only perform, but also minimize some of the things that both some of us, which is sound. Released along side with their popular Silent Joystick we have the newly released "Silent Buttons." These new buttons minimize the sound level at each press tremendously.	1	3
19	CROWN SDB-202C ALL CLEAR 30mm Mechanical Pushbutton	600	Mechanical switches has been the standard for the best performing keyboards on the market for many years.	1	1
20	CROWN SDB-202-24 SOLID [24mm] Mechanical Pushbutton	400	24mm Solid Color Pushbutton. The time is finally here. We've been pushing Crown to make 24mm mechanical pushbuttons for quite some time as the market has seen a demand for it.  With these, you'll be able to play in silence with the Speed Silver as well as achieve the fastest response time.	1	1
21	Hori Hayabusa Matte Pushbutton [24mm] Various Colors	400	These are the official Hori Hayabusa Matte pushbuttons in 24mm version.  Please note that while these do use the Hori switches, they are not the short throw variant	1	2
22	Sanwa Denshi (30mm) SOLID COLOR Pushbutton (OBSF30)	600	The advantage that the Japanese buttons have over the American buttons is response time and accuracy.  Use these yourself and you will be a true believer.  At high levels of competition, each and every 'input' counts and for the most precise and responsive button, look no further than Sanwa buttons. They look great, but most importantly, perform to the highest standards.	1	3
23	SEIMITSU PS-14-KEIKOU [Screw-On Type] (30mm) PUSHBUTTON	400	Seimitsu often produces limited edition products made for special trade shows. These were slated to be released in February 2016 at the JAEPO Trade Show in Japan, but got pushed back until September 2016.	1	4
24	LFZ: FullStack 30mm Pushbutton	220	Sanwa pushbuttons commemorating LFZ cohort 2.20 graduation!	1	13
25	LFZ: FullStack T-shirt	220	T-shirt commemorating LFZ cohort 2.20 graduation! 100% carbon fiber.	5	13
26	Street Fighter III: 3rd Strike Breaking Back Tee by Motoki Yoshihara	3200	Time and time again, we always wonder how Yoshihara-san can out do himself.  We've challenged him to make another epic piece that tops his previous and once again, it does not disappoint. Introducing "Breaking Back" a Street Fighter III: 3rd Strike story of Ryu carrying the whole gang on his back and we're pretty sure he could carry a few more.	5	10
27	SANWA DENSHI ELEPHANT BUTTON MASHER PULLOVER HOODIE	4500	If you've purchased a fight stick in the past few years, chances are they are stocked with Sanwa Denshi parts. The largest parts maker for fight sticks in the world. Their iconic elephant logo is seen here mashing their famous OBSF30 pushbuttons. Like an elephant, this thick skin will keep you warm.	5	10
28	SPLITFRAME FS TRANSPORTER: BLACKOUT EDITION	13000	The first thing you'll notice when you see SPLITFRAME LLC's latest fight stick bag creation is PREMIUM quality.  At every measurement, the BLACKOUT Edition is an upgrade from all it's predecessors. There are bags out on the market using similar materials that are 50-75% more in cost, but do not live up to the detailed standards here. This bag was made to impress, both visually and functionally.	6	10
29	Qanba Aegis Stick Bag	7000	The ultimate Dragon joystick travel backpack. Main joystick storage layer with reinforced stick guard.	6	6
\.


--
-- Data for Name: productsColors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."productsColors" ("productId", "colorId") FROM stdin;
\.


--
-- Data for Name: productsSizes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."productsSizes" ("productId", "sizeId") FROM stdin;
\.


--
-- Data for Name: promos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.promos ("promoId", name, "imagePath", url) FROM stdin;
\.


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sizes ("sizeId", name, abbreviation) FROM stdin;
1	Small	S
2	Medium	M
3	Large	L
4	X-Large	XL
5	XX-Large	2XL
6	XXX-Large	3XL
\.


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.brands_id_seq', 13, true);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 42, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 21, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.colors_id_seq', 7, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 12, true);


--
-- Name: productImages_productImageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."productImages_productImageId_seq"', 1, false);


--
-- Name: productStyle_styleId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."productStyle_styleId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 29, true);


--
-- Name: promo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.promo_id_seq', 1, false);


--
-- Name: sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sizes_id_seq', 6, true);


--
-- Name: brands brands_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pk PRIMARY KEY ("brandId");


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY ("categoryId");


--
-- Name: colors colors_hex_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_hex_key UNIQUE (hex);


--
-- Name: colors colors_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key UNIQUE (name);


--
-- Name: colors colors_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pk PRIMARY KEY ("colorId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: productImages productImages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_pkey" PRIMARY KEY ("productImageId");


--
-- Name: productStyle productStyle_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productStyle"
    ADD CONSTRAINT "productStyle_pk" PRIMARY KEY ("styleId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: promos promo_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promos
    ADD CONSTRAINT promo_pk PRIMARY KEY ("promoId");


--
-- Name: sizes sizes_abbreviation_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_abbreviation_key UNIQUE (abbreviation);


--
-- Name: sizes sizes_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_name_key UNIQUE (name);


--
-- Name: sizes sizes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pk PRIMARY KEY ("sizeId");


--
-- Name: productImages productImages_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_fk0" FOREIGN KEY ("productId") REFERENCES public.products("productId");


--
-- Name: productImages productImages_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_fk1" FOREIGN KEY ("colorId") REFERENCES public.colors("colorId");


--
-- Name: productImages productImages_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_fk2" FOREIGN KEY ("styleId") REFERENCES public."productStyle"("styleId");


--
-- Name: productStyle productStyle_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productStyle"
    ADD CONSTRAINT "productStyle_fk0" FOREIGN KEY ("productId") REFERENCES public.products("productId");


--
-- Name: products products_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_fk0 FOREIGN KEY ("categoryId") REFERENCES public.categories("categoryId");


--
-- Name: products products_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_fk1 FOREIGN KEY ("brandId") REFERENCES public.brands("brandId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

