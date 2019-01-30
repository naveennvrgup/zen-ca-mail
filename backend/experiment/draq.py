import dramatiq
import requests
import time

@dramatiq.actor
def count_words(url):
    time.sleep()
    print('10 seconds have passed')


count_words.send("http://example.com")
print('finiished')