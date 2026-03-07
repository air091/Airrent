--
-- PostgreSQL database dump
--

\restrict kjJM5F2tRGpp9836NPCZFo6ktdWesr3VwZnMOqNRZdKXFqZNU3clfWH74qyyXhI

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

-- Started on 2026-03-06 14:35:40 PST

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

--
-- TOC entry 7 (class 2615 OID 16443)
-- Name: auth; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO postgres;

--
-- TOC entry 6 (class 2615 OID 16442)
-- Name: market; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA market;


ALTER SCHEMA market OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16700)
-- Name: accounts; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    image_url text,
    status_id uuid NOT NULL
);


ALTER TABLE auth.accounts OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16498)
-- Name: roles; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE auth.roles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16492)
-- Name: statuses; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.statuses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE auth.statuses OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16775)
-- Name: payment_statuses; Type: TABLE; Schema: market; Owner: postgres
--

CREATE TABLE market.payment_statuses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE market.payment_statuses OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16804)
-- Name: plans; Type: TABLE; Schema: market; Owner: postgres
--

CREATE TABLE market.plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(8,2) DEFAULT 0,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE market.plans OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16781)
-- Name: rentals; Type: TABLE; Schema: market; Owner: postgres
--

CREATE TABLE market.rentals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    service_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    rent_start timestamp without time zone NOT NULL,
    rent_end timestamp without time zone,
    booked_at timestamp without time zone DEFAULT now(),
    payment_status_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    plan_id uuid NOT NULL
);


ALTER TABLE market.rentals OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16615)
-- Name: service_plans; Type: TABLE; Schema: market; Owner: postgres
--

CREATE TABLE market.service_plans (
    service_id uuid NOT NULL,
    plan_id uuid NOT NULL
);


ALTER TABLE market.service_plans OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16567)
-- Name: service_statuses; Type: TABLE; Schema: market; Owner: postgres
--

CREATE TABLE market.service_statuses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE market.service_statuses OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16576)
-- Name: services; Type: TABLE; Schema: market; Owner: postgres
--

CREATE TABLE market.services (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    image_url text,
    description text,
    status_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE market.services OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16591)
-- Name: user_services; Type: TABLE; Schema: market; Owner: postgres
--

CREATE TABLE market.user_services (
    service_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE market.user_services OWNER TO postgres;

--
-- TOC entry 3515 (class 0 OID 16700)
-- Dependencies: 223
-- Data for Name: accounts; Type: TABLE DATA; Schema: auth; Owner: postgres
--

INSERT INTO auth.accounts VALUES ('938e883b-c015-43aa-8409-112c917919d3', 'test1', 'test1@email.com', '$2b$10$xwpKg9IEFrDTjU50LN/0ZO3DOCgFGsHH3X.v2iSehrdtJ3WV1aCpK', 'b4ae9133-1156-4a36-99c4-0901f6f03cac', '2026-03-05 10:48:54.290165', '2026-03-05 10:48:54.290165', NULL, '8b26dd0d-1e4e-42e2-8eb5-6ce07dfc7b3b');
INSERT INTO auth.accounts VALUES ('1515f9c5-a01d-4a4c-96b6-82567eddea31', 'test2', 'test2@email.com', '$2b$10$Iy8V.S6/oCC2akO3z5ghwOUlaQPxroHauSvtowSvrQJpSXiVTKh3C', 'b4ae9133-1156-4a36-99c4-0901f6f03cac', '2026-03-05 10:49:26.803079', '2026-03-05 10:49:26.803079', NULL, '8b26dd0d-1e4e-42e2-8eb5-6ce07dfc7b3b');


--
-- TOC entry 3510 (class 0 OID 16498)
-- Dependencies: 218
-- Data for Name: roles; Type: TABLE DATA; Schema: auth; Owner: postgres
--

INSERT INTO auth.roles VALUES ('b4ae9133-1156-4a36-99c4-0901f6f03cac', 'client');
INSERT INTO auth.roles VALUES ('032787f2-e945-45fd-97d9-50d14395cf16', 'admin');


--
-- TOC entry 3509 (class 0 OID 16492)
-- Dependencies: 217
-- Data for Name: statuses; Type: TABLE DATA; Schema: auth; Owner: postgres
--

INSERT INTO auth.statuses VALUES ('8b26dd0d-1e4e-42e2-8eb5-6ce07dfc7b3b', 'active');
INSERT INTO auth.statuses VALUES ('eec43141-54d0-4247-ab19-e2a6c7706dd1', 'deactivated');


--
-- TOC entry 3516 (class 0 OID 16775)
-- Dependencies: 224
-- Data for Name: payment_statuses; Type: TABLE DATA; Schema: market; Owner: postgres
--

INSERT INTO market.payment_statuses VALUES ('cf9e8495-2b18-48e6-8c1e-e0a6fc708682', 'pending');
INSERT INTO market.payment_statuses VALUES ('4b8ce378-483f-413c-a9cb-983612c3afa1', 'paid');
INSERT INTO market.payment_statuses VALUES ('3ee84041-7170-4130-9f6b-1a5aa0d495d6', 'overdue');


--
-- TOC entry 3518 (class 0 OID 16804)
-- Dependencies: 226
-- Data for Name: plans; Type: TABLE DATA; Schema: market; Owner: postgres
--

INSERT INTO market.plans VALUES ('390b59a5-2bb7-45e5-abbf-c460561d4255', 'plan1', 23.00, '', '2026-03-06 11:43:28.659426', '2026-03-06 11:43:28.659426');
INSERT INTO market.plans VALUES ('886517dc-684d-4a25-99b6-b1aa1f9e47b1', 'plan1', 23.00, '', '2026-03-06 11:47:25.461614', '2026-03-06 11:47:25.461614');
INSERT INTO market.plans VALUES ('92dd9f9a-870b-4287-8243-2f0de6d8610a', 'plan2', 23.00, '', '2026-03-06 11:56:31.8918', '2026-03-06 11:56:31.8918');
INSERT INTO market.plans VALUES ('bf2a546c-949a-4dbd-a25d-b6ca583f9602', 'plan2', 23.00, '', '2026-03-06 11:57:40.992209', '2026-03-06 11:57:40.992209');


--
-- TOC entry 3517 (class 0 OID 16781)
-- Dependencies: 225
-- Data for Name: rentals; Type: TABLE DATA; Schema: market; Owner: postgres
--



--
-- TOC entry 3514 (class 0 OID 16615)
-- Dependencies: 222
-- Data for Name: service_plans; Type: TABLE DATA; Schema: market; Owner: postgres
--

INSERT INTO market.service_plans VALUES ('7f421e5f-bbfb-4aa1-8cf5-d552fd7b8ba4', '390b59a5-2bb7-45e5-abbf-c460561d4255');
INSERT INTO market.service_plans VALUES ('7f421e5f-bbfb-4aa1-8cf5-d552fd7b8ba4', '886517dc-684d-4a25-99b6-b1aa1f9e47b1');
INSERT INTO market.service_plans VALUES ('7f421e5f-bbfb-4aa1-8cf5-d552fd7b8ba4', '92dd9f9a-870b-4287-8243-2f0de6d8610a');
INSERT INTO market.service_plans VALUES ('7f421e5f-bbfb-4aa1-8cf5-d552fd7b8ba4', 'bf2a546c-949a-4dbd-a25d-b6ca583f9602');


--
-- TOC entry 3511 (class 0 OID 16567)
-- Dependencies: 219
-- Data for Name: service_statuses; Type: TABLE DATA; Schema: market; Owner: postgres
--

INSERT INTO market.service_statuses VALUES ('de6ffded-f6b0-4139-b795-4d1eddb01f5f', 'vacant');
INSERT INTO market.service_statuses VALUES ('5e682843-ce50-4c7c-ae90-d74d2e28a615', 'occupied');


--
-- TOC entry 3512 (class 0 OID 16576)
-- Dependencies: 220
-- Data for Name: services; Type: TABLE DATA; Schema: market; Owner: postgres
--

INSERT INTO market.services VALUES ('7f421e5f-bbfb-4aa1-8cf5-d552fd7b8ba4', 'test service 2', 'test2.image', '', 'de6ffded-f6b0-4139-b795-4d1eddb01f5f', '2026-03-05 16:16:53.13574', '2026-03-05 16:16:53.13574');
INSERT INTO market.services VALUES ('7e613037-c1ac-47e7-be10-5ffc2dd9f826', 'test service 2', 'test2.image', '', 'de6ffded-f6b0-4139-b795-4d1eddb01f5f', '2026-03-06 10:50:07.159712', '2026-03-06 10:50:07.159712');


--
-- TOC entry 3513 (class 0 OID 16591)
-- Dependencies: 221
-- Data for Name: user_services; Type: TABLE DATA; Schema: market; Owner: postgres
--

INSERT INTO market.user_services VALUES ('7f421e5f-bbfb-4aa1-8cf5-d552fd7b8ba4', '938e883b-c015-43aa-8409-112c917919d3');
INSERT INTO market.user_services VALUES ('7e613037-c1ac-47e7-be10-5ffc2dd9f826', '938e883b-c015-43aa-8409-112c917919d3');


--
-- TOC entry 3346 (class 2606 OID 16711)
-- Name: accounts accounts_email_key; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- TOC entry 3348 (class 2606 OID 16709)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3340 (class 2606 OID 16503)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3338 (class 2606 OID 16497)
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- TOC entry 3350 (class 2606 OID 16780)
-- Name: payment_statuses payment_statuses_pkey; Type: CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.payment_statuses
    ADD CONSTRAINT payment_statuses_pkey PRIMARY KEY (id);


--
-- TOC entry 3354 (class 2606 OID 16814)
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- TOC entry 3352 (class 2606 OID 16788)
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (id);


--
-- TOC entry 3342 (class 2606 OID 16572)
-- Name: service_statuses service_statuses_pkey; Type: CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.service_statuses
    ADD CONSTRAINT service_statuses_pkey PRIMARY KEY (id);


--
-- TOC entry 3344 (class 2606 OID 16585)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- TOC entry 3360 (class 2606 OID 16712)
-- Name: accounts accounts_role_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT accounts_role_id_fkey FOREIGN KEY (role_id) REFERENCES auth.roles(id) ON DELETE CASCADE;


--
-- TOC entry 3361 (class 2606 OID 16756)
-- Name: accounts status_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.accounts
    ADD CONSTRAINT status_id_fkey FOREIGN KEY (status_id) REFERENCES auth.statuses(id);


--
-- TOC entry 3362 (class 2606 OID 16820)
-- Name: rentals plan_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.rentals
    ADD CONSTRAINT plan_id_fkey FOREIGN KEY (plan_id) REFERENCES market.plans(id) ON DELETE CASCADE;


--
-- TOC entry 3358 (class 2606 OID 16815)
-- Name: service_plans plan_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.service_plans
    ADD CONSTRAINT plan_id_fkey FOREIGN KEY (plan_id) REFERENCES market.plans(id) ON DELETE CASCADE;


--
-- TOC entry 3363 (class 2606 OID 16799)
-- Name: rentals rentals_payment_status_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.rentals
    ADD CONSTRAINT rentals_payment_status_id_fkey FOREIGN KEY (payment_status_id) REFERENCES market.payment_statuses(id) ON DELETE CASCADE;


--
-- TOC entry 3364 (class 2606 OID 16789)
-- Name: rentals rentals_service_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.rentals
    ADD CONSTRAINT rentals_service_id_fkey FOREIGN KEY (service_id) REFERENCES market.services(id) ON DELETE CASCADE;


--
-- TOC entry 3365 (class 2606 OID 16794)
-- Name: rentals rentals_tenant_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.rentals
    ADD CONSTRAINT rentals_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES auth.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 3359 (class 2606 OID 16690)
-- Name: service_plans service_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.service_plans
    ADD CONSTRAINT service_id_fkey FOREIGN KEY (service_id) REFERENCES market.services(id) ON DELETE CASCADE;


--
-- TOC entry 3356 (class 2606 OID 16661)
-- Name: user_services services_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.user_services
    ADD CONSTRAINT services_id_fkey FOREIGN KEY (service_id) REFERENCES market.services(id) ON DELETE CASCADE;


--
-- TOC entry 3355 (class 2606 OID 16586)
-- Name: services services_status_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.services
    ADD CONSTRAINT services_status_id_fkey FOREIGN KEY (status_id) REFERENCES market.service_statuses(id);


--
-- TOC entry 3357 (class 2606 OID 16746)
-- Name: user_services user_id_fkey; Type: FK CONSTRAINT; Schema: market; Owner: postgres
--

ALTER TABLE ONLY market.user_services
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.accounts(id) ON DELETE CASCADE;


-- Completed on 2026-03-06 14:35:40 PST

--
-- PostgreSQL database dump complete
--

\unrestrict kjJM5F2tRGpp9836NPCZFo6ktdWesr3VwZnMOqNRZdKXFqZNU3clfWH74qyyXhI

