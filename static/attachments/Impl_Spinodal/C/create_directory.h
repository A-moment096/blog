#ifndef MY_CREATE_DIRECTORY
#define MY_CREATE_DIRECTORY

#include <errno.h>
#include <stdio.h>
#include <string.h>

#ifdef _WIN32
#include <direct.h>
#define PATH_SEP1 '\\'
#define PATH_SEP2 '/'
#define MKDIR(path) _mkdir(path)
#else
#include <sys/stat.h>
#include <sys/types.h>
#define PATH_SEP1 '/'
#define PATH_SEP2 '/'
#define MKDIR(path) mkdir(path, 0755)
#endif

static int do_mkdir(const char *path) {
    if (MKDIR(path) == 0) {
        return 0;
    }
    if (errno == EEXIST) {
        return 0;
    }
    return -1;
}

int create_directories(const char *path) {
    char tmp[1024];
    size_t len;
    char *p;

    if (!path || !*path) {
        return -1;
    }

    len = strlen(path);
    if (len >= sizeof(tmp)) {
        errno = ENAMETOOLONG;
        return -1;
    }

    snprintf(tmp, sizeof(tmp), "%s", path);

    for (p = tmp + 1; *p; ++p) {
        if (*p == PATH_SEP1 || *p == PATH_SEP2) {
            char old = *p;
            *p = '\0';

            if (do_mkdir(tmp) != 0) {
                return -1;
            }

            *p = old;
        }
    }

    if (do_mkdir(tmp) != 0) {
        return -1;
    }

    return 0;
}

#endif