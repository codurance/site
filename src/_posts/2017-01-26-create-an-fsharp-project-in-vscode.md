---
layout: post
asset-type: post
name: create-an-fsharp-project-in-vscode
title: Create an F# project in VSCode
date: 2017-01-26 10:00:00 +00:00
author: Pedro Santos
image:
    src: /assets/custom/img/blog/2017-01-26-create-an-fsharp-project-in-vscode.jpg
    attribution:
      text: directions by Beat Tschanz
      href: https://www.flickr.com/photos/btschanz/13793872333/
tags:
- FSharp
- VSCode
- Ionide
- Tutorial

---
## Prerequisites
* Operating system
  * Windows
  * MacOs
  * Linux
* CLR
  * [.Net Framework](https://www.microsoft.com/net/download/framework) (Windows)
  * [Mono](http://www.mono-project.com/) (MacOs, Linux)
* [VSCode](https://code.visualstudio.com/)
   * With ionide extensions for VSCode ([http://ionide.io/](http://ionide.io/))
      * Ionide-FSharp
      * Ionide-FAKE
      * Ionide-Paket

## Step-by-step instructions  
* Create new directory
* Move to new directory
* At the console type ```Code .``` or open VSCode and then open the new directory you just created
* Press `[Shift]`  `[Command/Ctrl]` `[P]` and type ```F#```
* Select ```New Project```
* Choose ```classlib``` or ```console``` or other project type for the production project
* Choose the project directory (if left empty, current directory will be used)
* Provide a project name (using production.fsproj for this example)
* Press `[Shift]`  `[Command/Ctrl]` `[P]` and type ```FAKE```
* Choose ```Default build```, you should see an output similar to this:

   ```txt
Checking Paket version (downloading latest stable)...
Paket.exe 3.33.5 is up to date.
Paket version 3.33.5
0 seconds - ready.
Building project with version: LocalBuild
Shortened DependencyGraph for Target Build:
<== Build
   <== Clean
...
```
* Press `[Shift]`  `[Command/Ctrl]` `[P]` and type ```F#```
* Select ```New Project```
* Choose ```fsunit``` for test code
* Choose the project directory (if left empty current directory will be used)
* Provide a project name (using test.fsproj for this example)
* Open up the ```test.fsproj``` file
* Press `[Shift]`  `[Command/Ctrl]` `[P]` and type ```F#```
* Select ```Add Project Reference```
* Choose ```test.fsproj``` project as the project that you want to edit
* Choose ```production.fsproj``` project as the reference you want to add
* Verify that ```test.fsproj``` has been changed and contains a reference to ```production.fsproj```

   ```xml
...
<ItemGroup>
    <ProjectReference Include="../production/production.fsproj">
      <Name>production.fsproj</Name>
      <Project>{df896c20-dc7e-4d4d-90da-546d6154d641}</Project>
    </ProjectReference>
</ItemGroup>
...
```
* Press `[Shift]`  `[Command/Ctrl]` `[P]` and type ```paket```
* Select ```Add Nuget Package```
* Type ```Nunit.Console```
* Verify that ```paket.dependencies``` gets updated with new dependency

   ```fsharp
source https://www.nuget.org/api/v2
nuget FAKE
nuget FSharp.Core
nuget FsUnit
nuget FsCheck
nuget nunit.console // <- !!!This line should be present!!!
```
{% include mid_banner_ad.html %}
* Open ```build.fsx```
* Add ```open Fake.Testing``` after ```open Fake```

   ```fsharp
open Fake
open Fake.Testing // <--!!!Add this line!!!
```
* Add the test task

   ```fsharp
let testAssemblies = !! (buildDir + "*Tests.dll") // <--!!!Add this line!!!
Target "UnitTests" (fun _ -> testAssemblies |> NUnit3 id) // <--!!!Add this line!!!
```

* Add UnitTests to the build

   ```fsharp
"Clean"
  ==> "Build"
  ==> "UnitTests" // <--!!!Add this line!!!
  ==> "Deploy"
RunTargetOrDefault "Build"
```

* Press `[Shift]`  `[Command/Ctrl]` `[P]` and type ```FAKE```
* Choose ```build```
* Choose ```UnitTests```, you should see an output similar to this:

   ```txt
Checking Paket version (downloading latest stable)...
Paket.exe 3.33.5 is up to date.
Paket version 3.33.5
0 seconds - ready.
Building project with version: LocalBuild
Shortened DependencyGraph for Target UnitTests:
<== UnitTests
   <== Build
      <== Clean
...      
```
Voila!

###Bonus

* Press `[Shift]`  `[Command/Ctrl]` `[B]`
* Should show an error and you can choose to edit. Edit the configuration to run the build script

   ```sh
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "0.1.0",
    "command": "./build.sh", // <--!!!Modify this line to call your build script (build.sh on mac/linux) or (build.cmd on windows)!!!
    "isShellCommand": true,
    "args": [], // <--!!!Modify this line to remove arguments!!!
    "showOutput": "always"
}
```
* Press `[Shift]`  `[Command/Ctrl]` `[B]`, you should see an output similar to this:

   ```txt
Checking Paket version (downloading latest stable)...
Paket.exe 3.33.5 is up to date.
Paket version 3.33.5
0 seconds - ready.
Building project with version: LocalBuild
Shortened DependencyGraph for Target Build:
<== Build
   <== Clean
...
```
