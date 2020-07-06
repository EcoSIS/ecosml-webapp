## Run cloud function emulator

set key path (in docker dir)
```
export GOOGLE_APPLICATION_CREDENTIALS="path/to/ecosml-webapp/docker/google-key.json"
```

from this dir run
```
firebase serve
```

# deploy 

firebase deploy --only functions
