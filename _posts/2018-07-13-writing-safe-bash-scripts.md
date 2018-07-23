---
layout: post
name: writing-safe-bash-scripts
title: Writing safe(r) bash scripts
date: 2018-07-13 07:00:00 +00:00
author: Alvaro Garcia
canonical:
    name: my personal blog
    href: https://alvarogarcia7.github.io/blog/2018/07/13/writing-safe-bash-scripts/
image:
    src: /assets/custom/img/blog/accident-banana-skin-be-careful-36763.jpg
    attribution:
        text: by compliancesigns.com
tags:
- bash
- safety
- shellcheck
- tool
- devops
---


After writing more and more bash scripts for a client, I've decided to write down my thoughts about it.

This assumes you have some knowledge about bash, as it is not intended as a beginner's tutorial.

## Why bash scripts?

  * Bash is present in almost every unix/linux-based stack, now some Windows as well. An exception is the 'alpine' docker images, which have a smaller, lighter shell (more on that later)
  * Everything that you can automate, you can do from bash. Bash forces you to create a (first?) client for your application and see how the integration is from the user's perspective
  * Testing your application from bash forces you to treat your application as a black-box (e.g., different technology, no shared state, no access to internals)


### Using a safe bash subset: sh

This is useful for 'alpine' docker images, as some alpine do not include bash.

The more general you need your script to be, the more you should prefer sh rather than bash. A source of generality can be making your script public (publish it), executing it under multiple environments, making it the installer for other tools, etc.


## Tips

### Temporary files

Do not assume that the current directory is the place for writing temporary files (or any file, for that matter).

For temporary files, use `mktemp`, and for directories `mktemp -d`

```
$ man mktemp
MKTEMP(1)                 BSD General Commands Manual                MKTEMP(1)

NAME
     mktemp -- make temporary file name (unique)

DESCRIPTION
     The mktemp utility takes each of the given file name templates and over-
     writes a portion of it to create a file name.  This file name is unique
     and suitable for use by the application.
```

(remember to cleanup resources when your script exists - maybe use exit traps)

### (Exit) Traps

There are some resources that you need to remove / cleanup / close at the end of your script. Both when things go well as when they don't. Think of it as a (java) try-with-resources or try..catch..finally.

Bash offers [`trap`](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins) to perform this task:

```
trap arg signal
trap command signal
```

Taken from [here](https://bash.cyberciti.biz/guide/Trap_statement)

An example:

```
function finish {
  # Your cleanup code here
}
trap finish EXIT
trap finish SIGQUIT
```

More information, and this example from [here](http://redsymbol.net/articles/bash-exit-traps/)

### Do not hardcode the shell location

This is more common with perl than with bash, as most bash installs are placed at `/bin/bash`.

You can use `/usr/bin/env bash` / `/usr/bin/env sh` to spawn a shell.

Usage:

```
#!/usr/bin/env bash

#rest of commands
```

### Options for executing / Header

add these options:

```
set -euxo pipefail
```

These can be added anywhere, but I usually add them after the shebang (the beginning of the script)

Reference: [The set built-in](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)

Another reference: the inspiration for these options comes from [here](https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/)

a brief note:

  * `set -e` stops the execution if a command fails (this is the default behavior in `make`)
  * `set -u`: Treat unset variables and parameters other than the special parameters ‘@’ or ‘*’ as an error when performing parameter expansion. An error message will be written to the standard error, and a non-interactive shell will exit.
  * `set -x`: debug. Trace the commands on the console
  * `set -o pipefail`: make the pipe command fail if any of the commands in the pipe fail. 
    * Example: with this option disabled, `a|b|c` when `a` fails, b will execute, the return value will be the one of `b`
    * Example: with this option enabled, `a|b|c` when `a` fails, `b` will not execute, the return value will be the one of `a`

If you want to use a try...catch pattern, disable `-e` temporarily:

```
set +e # 1
ls NON_EXISTING_FILE # 2
set -e # 3
```

  * 1: Disable error-checking. Note this is a plus (+) sign
  * 2: a command that could fail. As the error checking is disabled, the execution continues even if 2 throws an error. Therefore, the exception is swallowed.
  * 3: Enable error-checking again

### Debugging

#### Enable tracing / debugging mode

I usually make my bash scripts as simple as possible (see Limitations), but even then, they fail often while building them.

For that reason, you can enable the 'debug' option permanently:

```
# Inside the script
set -x
```

Or just for one invocation:

```
# When invoking the script
bash -x myscript.sh
```

Note: your script will get the parameters in the same fashion as if executing `./myscript.sh`:

```
$ cat myscript.sh
echo $1
$ ./myscript.sh 1
1
$ bash -x myscript.sh 1
+ echo 1
1
```

#### Dry-run while building the script

A common pattern I use while building scripts is to prepare the command but do not execute it yet:

```
...
# prepare options, decide what to do
echo COMMAND_WITH_SIDE_EFFECTS
```

When I am sure that this is the desired command, usually after trying it manually on the console, I can remove the `echo`:

```
...
# prepare options, decide what to do
COMMAND_WITH_SIDE_EFFECTS
```

#### Dry-run as another switch

You can use the previous pattern but as a feature of your script:

  * Accept '-n / --dry-run' (or similar)
  * When the switch is enabled, it prepends `echo ` to your final command

```
COMMAND="rm -rf ./.git"
if [ $DRY_RUN ]; then
  COMMAND="echo $COMMAND"
fi

$COMMAND
```


### Verbosity levels and other modes

When some scripts grow in size and are not a script but an application, being more or less verbose is useful.

See `curl` as an example:

```
$ curl localhost:8080
curl: (7) Failed to connect to localhost port 8080: Connection refused
$ curl -vvv localhost:8080
* Rebuilt URL to: localhost:8080/
*   Trying ::1...
* connect to ::1 port 8080 failed: Connection refused
*   Trying fe80::1...
* connect to fe80::1 port 8080 failed: Connection refused
*   Trying 127.0.0.1...
* connect to 127.0.0.1 port 8080 failed: Connection refused
* Failed to connect to localhost port 8080: Connection refused
* Closing connection 0
```

Same with quiet mode, a mode to reduce verbosity.

Same with 'raw' mode, a mode to only print the raw output, maybe for consumption from another script. 

### Using quotes

Imagine a script that prints the first, second, and third received parameter, then all of them:

```
$ cat myscript.sh
echo "first=$1 second=$2 third=$3; all=$@"
```

The normal invocation:

```
$ ./myscript.sh 1 2 3
first=1 second=2 third=3; all=1 2 3
```

(everything works as expected)

now let's try strings (with spaces)

```
$ ./myscript.sh hello world
first=hello second=world third=; all=hello world
```

Ok, bash uses spaces to delimit words. Now that we know this, lets be careful.

We want to process some files (with spaces):

```
$ ls file*
file 1.txt file 2.txt
$ ./myscript.sh $(ls file*)
first=file second=1.txt third=file; all=file 1.txt file 2.txt
```

A defect appeared: I want "file 1.txt" to be a parameter, not two. 

Let's imagine a script checking whether a file exists:

```
$ cat file_exists.sh
if [ -e $1 ]; then # -e is for file exists; see `man test`
  echo "file $1 exists"
else
  echo "file $1 does not exist"
fi
```

```
$ ls file*
file 1.txt     file 2.txt     file_exists.sh
$ ./file_exists.sh "file 1.txt"
./file_exists.sh: line 1: [: file: binary operator expected
file file 1.txt does not exist
```

Let's add quotes to the test to make it work with spaces:

```
$ cat file_exists.sh
if [ -e "$1" ]; then # note the quotes
  echo "file $1 exists"
else
  echo "file $1 does not exist"
fi
$ ./file_exists.sh "file 1.txt"
file file 1.txt exists
```

In general, be careful with spaces, as they mark the end of the string / parameter. Be proactive with quoting. From the [google bash guide][google-bash-reference-guide]:

  * Always quote strings containing variables, command substitutions, spaces or shell meta characters, unless careful unquoted expansion is required.
  * Prefer quoting strings that are "words" (as opposed to command options or path names).
  * Never quote literal integers.
  * Be aware of the quoting rules for pattern matches in [[.
  * Use "$@" unless you have a specific reason to use $*.

Also: 

  * Single quote does not interpolate: `'$PATH' is literally $PATH`
  * Double quotes interpolate: `"$PATH" is the contents of the variable $PATH`
  * If possible, try having spaces in the files you produce. It makes life much simpler.

### SOLID

If your script is a one-off thing, or will not suffer churn/modification, then feel free to discard this tip. On the other hand, if this script will be part of a critical path (e.g., deploying) or will be modified in the future, try to apply the SOLID principles that we apply for other pieces of software.

Especially the SRP (below)

### Single Responsibility Principle (SRP)

I like to design my scripts by separating concerns or responsibilities.

One typical example: process many files at once:

```
$ cat s1.sh
#!/usr/bin/env bash

function find_files {
   while IFS= read -r -d '' file; do
       files+=( "$file" )
   done < <(find . -maxdepth 1 -type f -iname "file*.txt" -print0)
}

function process_file {
  file="$1"
  echo "Will write to file $file"
}

function main {
  declare -a files # this is a global variable inside the script
  find_files
  for file in "${files[@]}"; do
    process_file "$file"
  done
}

main
```

The main benefit is that iterating the files is something that usually does not fail (just copy paste the script), while the main work is done in `process_file`. The two functions have different pace of change, therefore two responsibilities. The latter, I can test manually (on the REPL) until it works, then copy-paste the script (see 'How I write my scripts').

Its execution:

```
$ ls file*
file1.txt file2.txt
$ ./s1.sh
Will write to file ./file1.txt
Will write to file ./file2.txt
```

For more information on return values and functions in bash, see [this article](https://www.linuxjournal.com/content/return-values-bash-functions)


### Hot-swap / reload

Files in bash are read every time you invoke them. So if you separate the `process_file` function to another file, you can change the contents of it while the long-running main script is working.

### Be extra careful with `rm`

This is common knowledge, but it can happen to any of us.

Removing files is a sharp-edged tool, such as `DELETE` in SQL. This is why we `SELECT` the same data set before deleting. Why we `ls` files before `rm`ing them.

Some operating systems now protect `#rm -rf /` with another flag, but the mistake of `#rm -rf $VARIABLE/*` where `$VARIABLE` is empty is common enough.

To avoid the above mistake,

```
#!/usr/env/bin bash
set -euxo pipefail
cd $VARIABLE #this will fail if $VARIABLE is unbound
rm -rf ./* # notice the dot (.) before the star
cd - #go back to the previous folder
```

This will only delete files from the current directory down (`./`), yet another level of protection. 

### Static code analysis

Shell files can also be analyzed statically, (i.e., [lint](https://en.wikipedia.org/wiki/Lint_(software))). A tool for that is [ShellCheck][shellcheck].

Shellcheck helps you locate possible errors, bugs, stylistic errors and suspicious constructs in your scripts.

The tool is large enough to warrant another article, but the basic usage is straightforward: run the linter with the shell script as input.

Some example run:

```
$ shellcheck sh1.sh
In sh1.sh line 22:
  destination=${date}-$(basename $file)
                                 ^-- SC2086: Double quote to prevent globbing and word splitting.

In sh1.sh line 25:
  git add $file
          ^-- SC2086: Double quote to prevent globbing and word splitting.


In sh1.sh line 34:
  if [[ -z $(which imagemagick) ]]; then
             ^-- SC2230: which is non-standard. Use builtin 'command -v' instead.
```

Note: I use the tool with docker (see [here](https://github.com/alvarogarcia7/shellcheck-docker), [official docker image](https://github.com/koalaman/shellcheck#installing))


## How I write my scripts

Usually, I design my scripts:

  * the function `process_file` to receive a single element (i.e., the function passed to `map` / iterate). This is the hard part
  * Create plumbing (either code or manual invocations), putting together the candidates with the other function.

### Example 1: a long-lived script

This is a full example with code to plumb the candidate to the function.

I want to remove all the existing files in a directory that are greater in size than 30 KB. (I know this can be done with `find -exec` or `ls | xargs rm`, this is just an example for arbitrary logic).

First, on the REPL, find all the files:

```
$ ls -lh file*
-rw-r--r--  1 user  group     0B Jul 13 00:50 file1.txt
-rw-r--r--  1 user  group     0B Jul 13 00:50 file2.txt
-rw-r--r--  1 user  group   531K Jul 13 00:07 file3.txt
```

Find files greater than the desired size:

```
$ find . -maxdepth 1 -type f -iname "file*.txt" -size +30k -print0
./file3.txt%
```

now, only need to delete the file:

```
function process_file {
  file="$1"
  echo "rm $file" # 1
}
```

Note: #1 - Notice the `echo` command to protect the real execution

First, I make sure that the plumbing code is all correct before executing commands with side effects (e.g., rm). If you are working with delicate data, you can consider working in a docker container.

Then, remove the "temporary dry-run mode":

```
function process_file {
  file="$1"
  rm $file
}
```


The full script:
```
$ cat s2.sh
#!/usr/bin/env bash

function find_files {
   while IFS= read -r -d '' file; do
       files+=( "$file" )
   done < <(find . -maxdepth 1 -type f -iname "file*.txt" -size +30k -print0)
}

function process_file {
  file="$1"
  rm $file
}

function main {
  declare -a files
  find_files
  for file in "${files[@]}"; do
    process_file "$file"
  done
}

main
```

### Example 2: a one-off script

This is a full example with a manual invocation to plumb the candidate to the function.:

  * the function `process_file` to receive a single element (i.e., the function passed to `map` / iterate).
  * Manually, I will list all files / candidates to a temporary file
  * Review the candidates
  * (with vim) turn the selected candidates into invocations.

First, on the REPL, find all the files:

```
$ ls -lh file*
-rw-r--r--  1 user  group     0B Jul 13 00:50 file1.txt
-rw-r--r--  1 user  group     0B Jul 13 00:50 file2.txt
-rw-r--r--  1 user  group   531K Jul 13 00:07 file3.txt
-rw-r--r--  1 user  group   531K Jul 13 00:07 file_SUPER_IMPORTANT_DO_NOT_DELETE.txt
```

Find files greater than the desired size:

```
$ find . -maxdepth 1 -type f -iname "file*.txt" -size +30k > candidates.txt
$ cat candidates.txt
./file3.txt
./file_SUPER_IMPORTANT_DO_NOT_DELETE.txt
```

Then, open vim to review, as a way of checking the valid candidates. This is the same process that `git rebase --interactive` offers: a CLI command to rebase based on your editor.

I realize that the file `file_SUPER_IMPORTANT_DO_NOT_DELETE.txt` should not be deleted. So I remove that, manually.

Now,

```
$ cat candidates.txt
./file3.txt
```

then I prefer to edit the file manually than to create a script. Remember, this is a one-off effort. And programs need to be maintained. One-off scripts are to be thrown away, so no maintenance effort.

Hint: the vim command `%s/^/rm /` will insert at the beginning of the line the command `rm ` that we need. The command `%s/$/;/` will append a semicolon at the end of the line. It's not needed for this example, but as a reminder. This replacement can also be done with `sed`/`awk`.

```
$ cat candidates.txt
rm ./file3.txt;
```

Now, just execute this file:

```
bash candidates.txt
```

And your files are processed. Gone, in this case.


## Limitations

Every tool (and metaphor) has its limits. Know when to use a tool and when to change tools.

### When is bash enough

Small scripts, simple invocations, etc.

One-off tasks are perfect for bash: write code, review effects, throw it away. Don't plan on reusing it. Although you can keep a collection of snippets for iterating, dealing with spaces, etc. 

More than 50-100 bash lines (a rough approximation), I consider a small program already. Maybe start thinking on building a better foundation around it.

### When it is too much for bash

#### Complex/multi-stage scripts

With my current knowledge of bash, I feel that some jobs are not appropriate for bash. For example, when dealing with spaces in strings, arrays, complex functions, etc.

For that, I prefer a more powerful language, ideally scripting (so I can get a quick feedback cycle.) I've been playing with Perl lately (works very well), Ruby in the past. I've heard good things about typescript and go as well.

Perl works well for powerful scripts that don't need to be tested.

Ruby works well for programs (no longer scripts) that need to be tested.

#### Parameter autocompletion

For my build scripts, I enjoy hitting `<tab>` for auto-completion of the goals. Bash does not offer that out of the box (but can be performed using [programmable completion](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)). Make, on the other hand, offers goal autocompletion out of the box:

```
.PHONY: build
build:
    ./gradlew build
```

Now, I can `make b<TAB>` and it will suggest `make build`


## Other resources

  * [ShellCheck][shellcheck] helps you check your shell scripts, using static analysis tools: ShellCheck is a GPLv3 tool that gives warnings and suggestions for bash/sh shell scripts.
  * [Bash reference manual](https://www.gnu.org/software/bash/manual/bash.html)
  * [Google Bash reference guide][google-bash-reference-guide]

[google-bash-reference-guide]: https://google.github.io/styleguide/shell.xml
[shellcheck]: https://www.shellcheck.net/
