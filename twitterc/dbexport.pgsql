--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: tweets; Type: TABLE; Schema: public; Owner: dmack
--

CREATE TABLE tweets (
    tid integer NOT NULL,
    datetime bigint,
    text character varying,
    uid integer
);


ALTER TABLE tweets OWNER TO dmack;

--
-- Name: tweets_tid_seq; Type: SEQUENCE; Schema: public; Owner: dmack
--

CREATE SEQUENCE tweets_tid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tweets_tid_seq OWNER TO dmack;

--
-- Name: tweets_tid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dmack
--

ALTER SEQUENCE tweets_tid_seq OWNED BY tweets.tid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dmack
--

CREATE TABLE users (
    uid integer NOT NULL,
    fname character varying,
    lname character varying,
    handle character varying
);


ALTER TABLE users OWNER TO dmack;

--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: dmack
--

CREATE SEQUENCE users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_uid_seq OWNER TO dmack;

--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dmack
--

ALTER SEQUENCE users_uid_seq OWNED BY users.uid;


--
-- Name: tweets tid; Type: DEFAULT; Schema: public; Owner: dmack
--

ALTER TABLE ONLY tweets ALTER COLUMN tid SET DEFAULT nextval('tweets_tid_seq'::regclass);


--
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: dmack
--

ALTER TABLE ONLY users ALTER COLUMN uid SET DEFAULT nextval('users_uid_seq'::regclass);


--
-- Data for Name: tweets; Type: TABLE DATA; Schema: public; Owner: dmack
--

COPY tweets (tid, datetime, text, uid) FROM stdin;
6	1517514973589	This is first's first	39
7	1517514987173	This is first's second!	39
8	1517515010805	This is second's first!	40
9	1517515042677	This is second's second and fourth overall	40
10	1517515139773	David is trying\r\n\r\nto tweet with two lines	41
11	1517515148638	David tweets again!	41
12	1517528790928	hi im new	42
13	1517528821576	srthdrhtdrt	42
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dmack
--

COPY users (uid, fname, lname, handle) FROM stdin;
39	First	Man	first
40	Second	Man	second
41	David	Mack	david
42	new	person	new
43	ok	fine	hey
\.


--
-- Name: tweets_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: dmack
--

SELECT pg_catalog.setval('tweets_tid_seq', 13, true);


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: dmack
--

SELECT pg_catalog.setval('users_uid_seq', 43, true);


--
-- Name: tweets tweets_pkey; Type: CONSTRAINT; Schema: public; Owner: dmack
--

ALTER TABLE ONLY tweets
    ADD CONSTRAINT tweets_pkey PRIMARY KEY (tid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dmack
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- PostgreSQL database dump complete
--

