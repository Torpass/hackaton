\! pwd
\set current_dir '/docker-entrypoint-initdb.d/datasets'


-- 2. Categories
CREATE TABLE IF NOT EXISTS "public"."categories" ("id" TEXT, "name" TEXT, "description" TEXT, "status" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/categories-a80804a01cb5de5b9c140914b9c8c048b86b4f354997bb09903bdc13b5b5f52d.csv'
TRUNCATE TABLE "public"."categories" CASCADE;
COPY "public"."categories" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 3. Charities
CREATE TABLE IF NOT EXISTS "public"."charities" ("id" TEXT, "description" TEXT, "status" TEXT, "createdAt" TEXT, "updatedAt" TEXT, "razon_social" TEXT, "identification" TEXT, "indentification_type" TEXT, "is_fundation" TEXT);
\set file_path :current_dir'/charities-b953c7ac9aff1c7def2495e5a8925bfaf71eced91d59d2b0b465dabe39e8df7a.csv'
TRUNCATE TABLE "public"."charities" CASCADE;
COPY "public"."charities" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 4. Communities
CREATE TABLE IF NOT EXISTS "public"."communities" ("id" TEXT, "name" TEXT, "region" TEXT, "status" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/communities-773a7dca86c112d36c7443127ccfbbe0378ae9494bdbff7492aaaac137e2295c.csv'
TRUNCATE TABLE "public"."communities" CASCADE;
COPY "public"."communities" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 5. Pathologies
CREATE TABLE IF NOT EXISTS "public"."pathologies" ("id" TEXT, "name" TEXT, "status" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/pathologies-cb60314d818083b80c95bb118c643dbf05511a3ca55aee45a16519b9008cbcc8.csv'
TRUNCATE TABLE "public"."pathologies" CASCADE;
COPY "public"."pathologies" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 6. Patients (depende de Communities)
CREATE TABLE IF NOT EXISTS "public"."patients" ("id" TEXT, "first_name" TEXT, "last_name" TEXT, "birth_date" TEXT, "email" TEXT, "id_card" TEXT, "phone" TEXT, "address" TEXT, "gender" TEXT, "status" TEXT, "economic_status" TEXT, "vulnerability_level" TEXT, "community_id" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/patients-81bf5645a68f5e3406186342e100ddf6dadef0fc81e4f98efa7fc093e960b747.csv'
TRUNCATE TABLE "public"."patients" CASCADE;
COPY "public"."patients" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 7. Treatments (depende de Patients)
CREATE TABLE IF NOT EXISTS "public"."treatments" ("id" TEXT, "patient_id" TEXT, "observation" TEXT, "status" TEXT, "active" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/treatments-e6860da25a3ead5ea8db27c0eb2fd0df356efc7705ace2ea5e3beb49d4c2f96b.csv'
TRUNCATE TABLE "public"."treatments" CASCADE;
COPY "public"."treatments" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 8. Donations (depende de Categories, Charities)
CREATE TABLE IF NOT EXISTS "public"."donations" ("id" TEXT, "description" TEXT, "category_id" TEXT, "charity_id" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/donations-32a9d18c526ebea3b42723ef0eab6116e60830bdd9bb6eb89b27cb837e19ee38.csv'
TRUNCATE TABLE "public"."donations" CASCADE;
COPY "public"."donations" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 9. Medications
CREATE TABLE IF NOT EXISTS "public"."medications" ("id" TEXT, "name" TEXT, "quantity" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/medications-e3d67bf22fe5714e955f3ffe91712b8205071f741df84d1153087ef0c1f580f0.csv'
TRUNCATE TABLE "public"."medications" CASCADE;
COPY "public"."medications" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 10. Medication Expiration Dates (depende de Medications)
CREATE TABLE IF NOT EXISTS "public"."medication_expiration_dates" ("id" TEXT, "medication_id" TEXT, "expiration_date" TEXT, "quantity" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/medication_expiration_dates-2b018dd3b08175e565b892e2ca4020dc45c6634363a453b38487fb4ba686c4f2.csv'
TRUNCATE TABLE "public"."medication_expiration_dates" CASCADE;
COPY "public"."medication_expiration_dates" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 11. Medication Pathologies (depende de Pathologies, Medications)
CREATE TABLE IF NOT EXISTS "public"."medication_pathologies" ("pathology_id" TEXT, "medication_id" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/medication_pathologies-32aadadc2bccc5f3f4f096d746916e58548b8e7868e54d4296bd11fa19a879b2.csv'
TRUNCATE TABLE "public"."medication_pathologies" CASCADE;
COPY "public"."medication_pathologies" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 12. Medication Donations (depende de Medications, Donations)
CREATE TABLE IF NOT EXISTS "public"."medication_donations" ("id" TEXT, "medication_id" TEXT, "donation_id" TEXT, "quantity" TEXT, "expiration_date" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/medication_donations-02c36425cb4da7ae7ad3b5eb230fb00c69e9bacee06ba382ccca8218f068974f.csv'
TRUNCATE TABLE "public"."medication_donations" CASCADE;
COPY "public"."medication_donations" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 13. Medication Treatments (depende de Medications, Treatments)
CREATE TABLE IF NOT EXISTS "public"."medication_treatments" ("treatment_id" TEXT, "medication_id" TEXT, "quantity" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/medication_treatments-91a6cd9a534cb20e51063a3398b36bd5e8e4d72eb53b503a0f6e7490814edb23.csv'
TRUNCATE TABLE "public"."medication_treatments" CASCADE;
COPY "public"."medication_treatments" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 14. Deliveries (depende de Treatments, Patients)
CREATE TABLE IF NOT EXISTS "public"."deliveries" ("id" TEXT, "treatment_id" TEXT, "patient_id" TEXT, "withdrawal_date" TEXT, "appointment_date" TEXT, "expiration_date" TEXT, "status" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/deliveries-c2010363cb5b33a1075edab6cb9e28e32974db332e9bd1a444ad2c228ee87f12.csv'
TRUNCATE TABLE "public"."deliveries" CASCADE;
COPY "public"."deliveries" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 15. Delivery Details (depende de Deliveries, Medications)
CREATE TABLE IF NOT EXISTS "public"."delivery_details" ("delivery_id" TEXT, "medication_id" TEXT, "quantity" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/delivery_details-fecbfcd2d8f6d618061c0d9ee7893e26c150efc0c2618f5b4ffd580c521ac03c.csv'
TRUNCATE TABLE "public"."delivery_details" CASCADE;
COPY "public"."delivery_details" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 16. Returns (depende de Deliveries)
CREATE TABLE IF NOT EXISTS "public"."returns" ("id" TEXT, "delivery_id" TEXT, "return_date" TEXT, "status" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/returns-fb1ab9978c931ea62b7cdf8bd5085acc7ea2f2a4706a9afe44e1efa99c92e72f.csv'
TRUNCATE TABLE "public"."returns" CASCADE;
COPY "public"."returns" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 17. Return Details (depende de Returns, Medications)
CREATE TABLE IF NOT EXISTS "public"."return_details" ("return_id" TEXT, "medication_id" TEXT, "quantity" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/return_details-b345b59242ab0bc800e36274dbb07860caeb6f0ac7ae8a8560659ace2e7c5261.csv'
TRUNCATE TABLE "public"."return_details" CASCADE;
COPY "public"."return_details" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 18. Medication Disposals (depende de Medications)
CREATE TABLE IF NOT EXISTS "public"."medication_disposals" ("id" TEXT, "medication_id" TEXT, "disposal_date" TEXT, "quantity" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/medication_disposals-9ba3aeda84a782b27fea2e6a0a9fe931537c4d3cb367a5be3c26e8f06bf9bdfd.csv'
TRUNCATE TABLE "public"."medication_disposals" CASCADE;
COPY "public"."medication_disposals" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');

-- 19. Pathology Patients (depende de Pathologies, Patients)
CREATE TABLE IF NOT EXISTS "public"."pathology_patients" ("pathology_id" TEXT, "patient_id" TEXT, "createdAt" TEXT, "updatedAt" TEXT);
\set file_path :current_dir'/pathology_patients-b311af83ff3a7299be2a4663b492b062a900d039aa4c92b90097528e64ef6676.csv'
TRUNCATE TABLE "public"."pathology_patients" CASCADE;
COPY "public"."pathology_patients" FROM :'file_path' WITH (FORMAT csv, DELIMITER ',', NULL 'NULL', QUOTE '"');