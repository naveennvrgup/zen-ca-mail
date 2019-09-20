cd frontend
npm run build
cd ../backend
source env/bin/activate
python3 manage.py collectstatic --noinput
cd ..
git add .
git commit -m 'built frontend'