
<p align="center">
  
  <a>
    <img src="https://github.com/vgagaleski/exceptionBeautifier/blob/master/images/logo_2.png" alt="exceptionBeautifier logo" width="72" height="72">
  </a>
</p>
<h3 align="center"> Exception beautifier </h3>

<p align="center">
  A browser extension that will help you beautify the stacktrace of the annoying exceptions. Works with .NET & C#
  <br>
  <a href="https://chrome.google.com/webstore/detail/exception-beautifier/lnjihceobbbfgbnoghfeeofplkdelion"><strong>Install extension »</strong></a>
  <br>
  <br>
  <a href="https://github.com/vgagaleski/exceptionBeautifier/issues">Report bug</a>
  ·
  <a href="https://github.com/vgagaleski/exceptionBeautifier/issues">Request feature</a>
</p>

## Table of contents
1. [Quick start](#quickstart)
2. [What's included](#whatsincluded)
3. [Features](#features)
4. [Demo](#demo)
5. [Bugs and feature requests](#bugsandfeaturerequests)
6. [Thanks](#thanks)

## Quick start <a name="quickstart"></a>
The extension can be downloaded on the official link: https://chrome.google.com/webstore/detail/exception-beautifier/lnjihceobbbfgbnoghfeeofplkdelion

However, if you want to use the code provided in this repository you should follow the following steps in order to make it work in your Chrome browser:

1. Download or clone the repository in your local machine
2. Open Google Chrome 
3. Navigate to Google Chrome -> Settings
4. From the Google Chrome Settings open -> Exensions
5. Enable the developer mode in the top right corner
6. Click on load unpacked
7. Select the exceptionBeutifier folder
8. Once the folder is uploaded you will be able to see the extension icon

## What's included  <a name="whatsincluded"></a>

```
exceptionBeautifier/
  ├── manifest.json
  ├── popup.html
  ├── popup.js
  ├── styles.css
  ├── demo
        └── demo.gif
  └── images/
        ├── icon16.png
        ├── icon48.png
        ├── icon128.png
        └── logo.png
```

## Features <a name="features"></a>
Paste one line unstructured stacktrace exception and get fully formatted output (see Demo section).

- Clear

Clears the input and output boxes.

- Copy to clipboard

The user can edit the settings and enable or disable the copy to clipboard setting. By default exceptionBeutifier has copy to clipboard set to enabled. 
This means that the exception will be copied once we paste it into the input box.

- Dark theme

Users can choose whether they like to use the bright or dark theme. By default exceptionBeutifier has copy to clipboard set to disabled. 
In order to enable dark mode the user should toggle the toggle to enabled state and save the changes.

*Note:* Changes won't apply if the user doesn't save before closing the settings.

## Demo <a name="demo"></a>
![Demo](https://github.com/vgagaleski/exceptionBeautifier/blob/master/demo/demo.gif)

Exception example: 

```
// One line:
System.Exception: Test outer exception ---> System.Exception: Hello Exception at TestExceptionGenerator.Spike.GetException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 29    at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 36     --- End of inner exception stack trace ---     at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 41     at TestExceptionGenerator.Spike.<GenericExceptionWithInnerException>b__1() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 21     at TestExceptionGenerator.Extensions.GetExceptionString(Action action) in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 56

// Beautified:
System.Exception: Test outer exception
  ---> System.Exception: Hello Exception at TestExceptionGenerator.Spike.GetException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 29
    at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 36
    --- End of inner exception stack trace ---
    at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 41
    at TestExceptionGenerator.Spike.<GenericExceptionWithInnerException>b__1() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 21
    at TestExceptionGenerator.Extensions.GetExceptionString(Action action) in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 56
```

## Bugs and feature requests <a name="bugsandfeaturerequests"></a>
Have you found any bug? Or you maybe have an interesting feautre request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, please open a new issue.

## Thanks <a name="thanks"></a>

Inspiration sources:
> https://staxmanade.com/ExceptionMessageBeautifier/
