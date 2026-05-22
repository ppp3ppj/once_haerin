## Restoring an app from an ONCE backup

If you created a backup file with ONCE, you can restore it with the `once restore` command.

### Restore command

```sh
once restore /absolute/path/to/backup-file.tar.gz
```

Example:

```sh
once restore /tmp/once-backups/once_haerin.c0e3ea-20260522-085050.tar.gz
```

---

## Important: hostname conflicts

ONCE restores the application using the hostname stored inside the backup.

If another app in the current ONCE namespace is already using the same hostname, restore will fail with:

```text
Error: restoring application: hostname already in use
```

For example, if `once list` shows:

```sh
once list
```

```text
localhost (running)
```

and the backup also contains `localhost`, you must remove the existing app first.

### Fix

```sh
once remove localhost
once restore /tmp/once-backups/once_haerin.c0e3ea-20260522-085050.tar.gz
```

Then verify:

```sh
once list
```

---

## Step-by-step restore flow

### 1. Check the current app list

```sh
once list
```

Example output:

```text
localhost (running)
```

### 2. Remove the currently running app if it uses the same hostname

```sh
once remove localhost
```

### 3. Restore the backup

```sh
once restore /tmp/once-backups/once_haerin.c0e3ea-20260522-085050.tar.gz
```

### 4. Confirm the app is back

```sh
once list
```

### 5. Open the app in your browser

If the app hostname is `localhost`, open:

```text
http://localhost
```

---

## Notes

- The backup file is usually a `.tar.gz` file created by ONCE.
- Restore uses the app settings stored in the backup.
- ONCE gives the restored app a new internal app name, but it keeps the original hostname from the backup.
- Because of that, restore cannot succeed if the hostname is already in use.

---

## Demo example

```sh
once list
once remove localhost
once restore /tmp/once-backups/once_haerin.c0e3ea-20260522-085050.tar.gz
once list
```

If successful, ONCE prints a message similar to:

```text
Restored once-haerin.xxxxxx from /tmp/once-backups/once_haerin.c0e3ea-20260522-085050.tar.gz
```
