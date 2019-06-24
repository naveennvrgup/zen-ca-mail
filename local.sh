git pull
cd frontend
npm run build
cd ../backend
source env/bin/activate
python3 manage.py migrate
python3 manage.py collectstatic --no-input
python3 manage.py celery