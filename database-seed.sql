CREATE TABLE students
(
    id SERIAL,
    namee VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT students_pkey PRIMARY KEY (id)
);
