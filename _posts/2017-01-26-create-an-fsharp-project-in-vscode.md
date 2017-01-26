---
layout: post
asset-type: post
name: create-an-fsharp-project-in-vscode
title: Create an F# project in VSCode
date: 2017-01-26 10:00:00 +00:00
author: Pedro Santos
image:
    src: /assets/img/custom/blog/2017-01-26-create-an-fsharp-project-in-vscode.jpg
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
  * [Mono](http://www.mono-project.com/]) (MacOs, Linux)
* VSCode (https://code.visualstudio.com/)
   * With ionide extensions for VSCode (http://ionide.io/)
      * Ionide-FSharp
      * Ionide-FAKE
      * Ionide-Paket

## Step-by-step instructions  
1. Create new directory
2. Move to new directory
3. Type on console ```Code .``` or open VSCode and then open the new directory you just created
4. Press `[Shift]`  `[Command]` `[P]` and type ```F#```
5. Select ```New Project```
6. Choose ```classlib``` or ```console``` or other project type for the production project
7. Choose the project directory (if left empty, current directory will be used)
8. Provide a project name (using production.fsproj for this example)
9. Press `[Shift]`  `[Command]` `[P]` and type ```FAKE```
10. Chose ```Default build```, you should see an output similar to this:

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
11. Press `[Shift]`  `[Command]` `[P]` and type ```F#```
12. Select ```New Project```
13. Choose ```fsunit``` for test code
14. Choose the project directory (if left empty current directory will be used)
15. Provide a project name (using test.fsproj for this example)
16. Open up the ```test.fsproj``` file
17. Press `[Shift]`  `[Command]` `[P]` and type ```F#```
18. Select ```Add Project Reference```
19. Choose ```test.fsproj``` project as the project that you want to edit
20. Choose ```production.fsproj``` project as the reference you want to add
21. Verify that ```test.fsproj``` has been changed and contains a reference to ```production.fsproj```

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
22. Press `[Shift]`  `[Command]` `[P]` and type ```paket```
23. Select ```Add Nuget Package```
24. Type ```Nunit.Console```
25. Verify that ```paket.dependencies``` gets updated with new dependency

   ```fsharp
source https://www.nuget.org/api/v2
nuget FAKE
nuget FSharp.Core
nuget FsUnit
nuget FsCheck
nuget nunit.console // <- !!!This line should be present!!!
```
26. Open ```build.fsx```
27. Add ```open Fake.Testing``` after ```open Fake```

   ```fsharp
// include Fake libs
#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open Fake.Testing // <--!!!Add this line!!!
```
28. Add test task

   ```fsharp
let testAssemblies = !! (buildDir + "*Tests.dll") // <--!!!Add this line!!!

Target "UnitTests" (fun _ -> testAssemblies |> NUnit3 id) // <--!!!Add this line!!!
```
29. add UnitTests to the build

   ```fsharp
"Clean"
  ==> "Build"
  ==> "UnitTests" // <--!!!Add this line!!!
  ==> "Deploy"

RunTargetOrDefault "Build"
```
30. Press `[Shift]`  `[Command]` `[P]` and type ```FAKE```
31. Chose ```build```
31. Choose ```UnitTests```, you should see an output similar to this:

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

1. Press `[Shift]`  `[Command]` `[B]`
2. Should show an error and you can choose to edit. Edit the configuration to run build script

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
3. Press `[Shift]`  `[Command]` `[B]`, you should see an output similar to this:

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
