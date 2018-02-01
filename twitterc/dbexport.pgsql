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
-- Name: tweets; Type: TABLE; Schema: public; Owner: machajew
--

CREATE TABLE tweets (
    tid integer NOT NULL,
    datetime integer,
    text character varying,
    uid integer
);


ALTER TABLE tweets OWNER TO machajew;

--
-- Name: tweets_tid_seq; Type: SEQUENCE; Schema: public; Owner: machajew
--

CREATE SEQUENCE tweets_tid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tweets_tid_seq OWNER TO machajew;

--
-- Name: tweets_tid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: machajew
--

ALTER SEQUENCE tweets_tid_seq OWNED BY tweets.tid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: machajew
--

CREATE TABLE users (
    uid integer NOT NULL,
    fname character varying,
    lname character varying,
    handle character varying
);


ALTER TABLE users OWNER TO machajew;

--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: machajew
--

CREATE SEQUENCE users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_uid_seq OWNER TO machajew;

--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: machajew
--

ALTER SEQUENCE users_uid_seq OWNED BY users.uid;


--
-- Name: tweets tid; Type: DEFAULT; Schema: public; Owner: machajew
--

ALTER TABLE ONLY tweets ALTER COLUMN tid SET DEFAULT nextval('tweets_tid_seq'::regclass);


--
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: machajew
--

ALTER TABLE ONLY users ALTER COLUMN uid SET DEFAULT nextval('users_uid_seq'::regclass);


--
-- Data for Name: tweets; Type: TABLE DATA; Schema: public; Owner: machajew
--

COPY tweets (tid, datetime, text, uid) FROM stdin;
3	33000	im first	9
4	33000	im first	9
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: machajew
--

COPY users (uid, fname, lname, handle) FROM stdin;
1	hey	there	feaeawef
2	double	a	aa
3	b	b	b
4	c	c	c
5	d	d	d
\.


--
-- Name: tweets_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: machajew
--

SELECT pg_catalog.setval('tweets_tid_seq', 4, true);


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: machajew
--

SELECT pg_catalog.setval('users_uid_seq', 5, true);


--
-- Name: tweets tweets_pkey; Type: CONSTRAINT; Schema: public; Owner: machajew
--

ALTER TABLE ONLY tweets
    ADD CONSTRAINT tweets_pkey PRIMARY KEY (tid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: machajew
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- PostgreSQL database dump complete
--

