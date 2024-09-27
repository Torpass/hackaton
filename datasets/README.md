# PostgreSQL Export

Generated on 2024-09-25 02:44:49.819291476 UTC by Fabricate v1.0.0

## Instructions

To load the data into a PostgreSQL database, execute the following command replacing the values with your own:

```bash
psql postgres://<user>:<password>@<host>:<port>/<db> -f load.sql -v current_dir="$(pwd)"
```

## Exported tables

This is the list of exported tables, with their corresponding row count and file names:

    public.admins: 4 rows => admins-c87e1847e0c7bbbcf25b40fd49a5ef9a7c5b798020f03935327902c4f94f672d.csv
    public.categories: 4 rows => categories-a80804a01cb5de5b9c140914b9c8c048b86b4f354997bb09903bdc13b5b5f52d.csv
    public.charities: 100 rows => charities-b953c7ac9aff1c7def2495e5a8925bfaf71eced91d59d2b0b465dabe39e8df7a.csv
    public.communities: 5 rows => communities-773a7dca86c112d36c7443127ccfbbe0378ae9494bdbff7492aaaac137e2295c.csv
    public.deliveries: 0 rows => deliveries-c2010363cb5b33a1075edab6cb9e28e32974db332e9bd1a444ad2c228ee87f12.csv
    public.delivery_details: 0 rows => delivery_details-fecbfcd2d8f6d618061c0d9ee7893e26c150efc0c2618f5b4ffd580c521ac03c.csv
    public.donations: 100 rows => donations-32a9d18c526ebea3b42723ef0eab6116e60830bdd9bb6eb89b27cb837e19ee38.csv
    public.medication_disposals: 100 rows => medication_disposals-9ba3aeda84a782b27fea2e6a0a9fe931537c4d3cb367a5be3c26e8f06bf9bdfd.csv
    public.medication_donations: 100 rows => medication_donations-02c36425cb4da7ae7ad3b5eb230fb00c69e9bacee06ba382ccca8218f068974f.csv
    public.medication_expiration_dates: 100 rows => medication_expiration_dates-2b018dd3b08175e565b892e2ca4020dc45c6634363a453b38487fb4ba686c4f2.csv
    public.medication_pathologies: 100 rows => medication_pathologies-32aadadc2bccc5f3f4f096d746916e58548b8e7868e54d4296bd11fa19a879b2.csv
    public.medications: 100 rows => medications-e3d67bf22fe5714e955f3ffe91712b8205071f741df84d1153087ef0c1f580f0.csv
    public.medication_treatments: 100 rows => medication_treatments-91a6cd9a534cb20e51063a3398b36bd5e8e4d72eb53b503a0f6e7490814edb23.csv
    public.pathologies: 100 rows => pathologies-cb60314d818083b80c95bb118c643dbf05511a3ca55aee45a16519b9008cbcc8.csv
    public.pathology_patients: 100 rows => pathology_patients-b311af83ff3a7299be2a4663b492b062a900d039aa4c92b90097528e64ef6676.csv
    public.patients: 100 rows => patients-81bf5645a68f5e3406186342e100ddf6dadef0fc81e4f98efa7fc093e960b747.csv
    public.return_details: 0 rows => return_details-b345b59242ab0bc800e36274dbb07860caeb6f0ac7ae8a8560659ace2e7c5261.csv
    public.returns: 0 rows => returns-fb1ab9978c931ea62b7cdf8bd5085acc7ea2f2a4706a9afe44e1efa99c92e72f.csv
    public.treatments: 100 rows => treatments-e6860da25a3ead5ea8db27c0eb2fd0df356efc7705ace2ea5e3beb49d4c2f96b.csv