## Systemd Files

These files expect this repo checkout out to /opt/ecosml-webapp.  Then symlink to ```/etc/systemd/system```

Next, tell systemd to start on boot

```
> sudo systemctl enable /opt/ecosml-webapp/docker/systemd/ecosml.service
```

Then

```bash
> sudo systemctl [start|stop] ecosml
```