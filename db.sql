create extension if not exists "uuid-ossp";
CREATE TYPE statuses AS ENUM ('OPEN', 'ORDERED');

create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null,
    updated_at date not null,
    status statuses
);

CREATE TABLE cart_items (
   cart_id uuid references carts(id),
   product_id uuid not null,
   count INT not null
);

INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('123e4567-e89b-12d3-a456-426614174000', '2023-03-25', '2023-03-25', 'OPEN');
INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('123e4567-e89b-12d3-a456-426614174000', '2023-03-26', '2023-03-26', 'OPEN');
INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('123e4567-e89b-12d3-a456-426614174000', '2023-03-27', '2023-03-27', 'OPEN');
INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('123e4567-e89b-12d3-a456-426614174000', '2023-03-28', '2023-03-28', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count) VALUES ('792e6f3e-6f26-44d6-a38b-37ed878cc699', '123e4567-e89b-12d3-a456-426614174001', 1);
INSERT INTO cart_items (cart_id, product_id, count) VALUES ('bd6718f2-5095-472f-bfda-e288318826dd', '123e4567-e89b-12d3-a456-426614174002', 2);
INSERT INTO cart_items (cart_id, product_id, count) VALUES ('bd7c86f4-2efc-440e-acb8-795326fdda0a', '123e4567-e89b-12d3-a456-426614174003', 3);
INSERT INTO cart_items (cart_id, product_id, count) VALUES ('a3973124-e7fe-4745-96bc-e7cc659ff3bb', '123e4567-e89b-12d3-a456-426614174004', 4);
