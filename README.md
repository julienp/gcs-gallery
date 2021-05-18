gsutil mb gs://gcs-gallery
gcloud iam service-accounts create gcs-gallery --project=astral-archive-247908
gsutil iam ch serviceAccount:gcs-gallery@astral-archive-247908.iam.gserviceaccount.com:roles/storage.admin gs://gcs-gallery
gcloud iam service-accounts keys create sa.json --iam-account=gcs-gallery@astral-archive-247908.iam.gserviceaccount.com
