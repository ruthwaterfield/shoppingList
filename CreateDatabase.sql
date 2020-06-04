sudo -i -u shopping
psql

\dt

CREATE TABLE supermarket_sections(
    id serial PRIMARY KEY,
    section VARCHAR(255) NOT NULL
);

CREATE TABLE list_items(
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    section integer NOT NULL,
    required bool default false,
    notes VARCHAR(255)
);

ALTER TABLE list_items 
ADD CONSTRAINT section_fk FOREIGN KEY (section) REFERENCES supermarket_sections (id);

INSERT INTO supermarket_sections (section)
     VALUES ('Fruit/ Veg'),
            ('Fridge'),
            ('Dried'),
            ('Misc/ Household'),
            ('Freezer');

INSERT INTO list_items (name, section)
     VALUES ('tomatoes', 1),
            ('courgettes', 1),
            ('milk', 2),
            ('pasta', 3);
