/**
 * 
 * System.Exception: Test outer exception ---> System.Exception: Hello Exceptionat TestExceptionGenerator.Spike.GetException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 29    at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 36     --- End of inner exception stack trace ---     at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 41     at TestExceptionGenerator.Spike.<GenericExceptionWithInnerException>b__1() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 21     at TestExceptionGenerator.Extensions.GetExceptionString(Action action) in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 56 
 * 
 * System.Exception: Test outer exception ---> System.Exception: Hello Exception!
   at TestExceptionGenerator.Spike.GetException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 29
   at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 36
   --- End of inner exception stack trace ---
   at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 41
   at TestExceptionGenerator.Spike.<GenericExceptionWithInnerException>b__1() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 21
   at TestExceptionGenerator.Extensions.GetExceptionString(Action action) in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 56
 *
 */

document.addEventListener("DOMContentLoaded", () => { 
  console.log("DOMContentLoaded...")

  initializeTheme();
  initializeCopyToClipboard();

  let inputBox = document.getElementById('input');
  let outputBox = document.getElementById('output');
  let clearBtn = document.getElementById('clearBtn');
  let settingsBtn = document.getElementById('settingsBtn');

  let saveButton = document.getElementById('saveBtn');
  let cancelButton = document.getElementById('cancelBtn');
  let closeXButton = document.getElementById('closeXBtn');
  let darkThemeToggle = document.getElementById('toggleDarkTheme');
  let copyToClipboardToggle = document.getElementById('toggleCopyToClipboard');

  let modalContent = document.getElementById('modal-content');
  let modalBackground = document.getElementById('modal-bg');

  let toggled = false;

  inputBox.addEventListener('paste', (event) => {

    let paste = (event.clipboardData || window.clipboardData).getData('text');
    inputBox.value = paste;

    outputBox.value = formatStackTrace(paste);
    isCopyToClipboardToggled().then(isToggled => {
      if (isToggled) {
        copyToClipboard();
      }
    })  
  });

  inputBox.addEventListener('keydown', (event) => {
   
    if (event.key === 'Enter') {
      event.preventDefault();

      outputBox.value = formatStackTrace(inputBox.value);
      isCopyToClipboardToggled().then(isToggled => {
        if (isToggled) {
          copyToClipboard();
        }
      })
    }
  });

  clearBtn.addEventListener('click', () => {
    inputBox.value = '';
    outputBox.value = '';
  })

  settingsBtn.addEventListener('click', () => {
    openModal();
  })

  darkThemeToggle.addEventListener("change", function() {
    toggled = true;
    setTheme(darkThemeToggle.checked);
  });

  saveButton.addEventListener("click", function() {

    chrome.storage.local.set({'copyToClipboardToggle': copyToClipboardToggle.checked}, function() {
      console.log('Value is set to ' + copyToClipboardToggle.checked);
    });

    chrome.storage.local.set({'darkThemeToggle': darkThemeToggle.checked}, function() {
      console.log('Value is set to ' + darkThemeToggle.checked);
    });

    modalContent.classList.remove('open');
    modalBackground.classList.remove('open');
  });

  cancelButton.addEventListener("click", function() {
    console.log("Cancel toggle: ", toggled);

    if (toggled) {
      chrome.storage.local.get('darkThemeToggle', function(result) {
        setTheme(result.darkThemeToggle);
      });
      toggled = false;
    }

    modalContent.classList.remove('open');
    modalBackground.classList.remove('open');
  });

  closeXButton.addEventListener("click", function() {
    console.log("X toggle: ", toggled);
    
    if (toggled) {
      chrome.storage.local.get('darkThemeToggle', function(result) {
        setTheme(result.darkThemeToggle);
      });
      toggled = false;
    }
    
    modalContent.classList.remove('open');
    modalBackground.classList.remove('open');
  });

});

openModal = () => {
  let modalContent = document.getElementById('modal-content');
  let modalBackground = document.getElementById('modal-bg');

  initializeCopyToClipboardToggle();
  initializeDarkThemeToggle();

  modalContent.classList.add('open');
  modalBackground.classList.add('open');
}

initializeCopyToClipboard = () => {
  chrome.storage.local.get('copyToClipboardToggle', function(result) {
    console.log('copyToClipboardToggle storage value: ', JSON.stringify(result));
    if (Object.keys(result).length === 0) { 
      chrome.storage.local.set({'copyToClipboardToggle': false}, function() {
        console.log('copyToClipboardToggle is set to ' + false);
      });
    }
  });
}

initializeCopyToClipboardToggle = () => {
  let toggle = document.querySelector("#toggleCopyToClipboard");
  chrome.storage.local.get('copyToClipboardToggle', function(result) {
    console.log('toggleCopyToClipboard storage value: ', JSON.stringify(result));
    if (Object.keys(result).length === 0) {
      chrome.storage.local.set({'copyToClipboardToggle': false}, function() {
        console.log('toggleCopyToClipboard is set to ' + false);
      });
    } else {
      if (result.copyToClipboardToggle) {
        if (!toggle.checked) {
          toggle.click();
        }
      } else {
        if (toggle.checked) {
          toggle.click();
        }
      }
    }
  });
}

isCopyToClipboardToggled = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('copyToClipboardToggle', function(result) {
      console.log('isCopyToClipboardToggled storage value: ', JSON.stringify(result));
      resolve(result.copyToClipboardToggle);
    });
  });
}
  
initializeTheme = () => {
  chrome.storage.local.get('darkThemeToggle', function(result) {
    console.log('darkThemeToggle storage value: ', JSON.stringify(result));
    if (Object.keys(result).length === 0) { 
      chrome.storage.local.set({'darkThemeToggle': false}, function() {
        console.log('darkThemeToggle is set to ' + false);
      });
      setTheme(false);
    } else {
      setTheme(result.darkThemeToggle);
    }
  });
}

initializeDarkThemeToggle = () => {
  let toggle = document.querySelector("#toggleDarkTheme");
  chrome.storage.local.get('darkThemeToggle', function(result) {
    console.log('darkThemeToggle storage value: ', JSON.stringify(result));
    if (Object.keys(result).length === 0) { 
      chrome.storage.local.set({'darkThemeToggle': false}, function() {
        console.log('darkThemeToggle is set to ' + false);
      });
    } else {
      if (result.darkThemeToggle) {
        if (!toggle.checked) {
          toggle.click();
        }
      } else {
        if (toggle.checked) {
          toggle.click();
        }
      }
    }
  });
}

setTheme = (theme) => {
  if (theme) {
    setThemeTransition();
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    setThemeTransition();
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

setThemeTransition = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
  }, 300);
}

copyToClipboard = () => {
  let copyText = document.querySelector("#output");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
}

formatStackTrace = (stackTrace) => {

  if (!stackTrace || stackTrace == "") {
    return '';
  }

  let result = removeNewLines(stackTrace);

  // The list of tokens to find and prepend new lines.
  const replacementTokens = [
    {
      format: /---\s*at/g,
      replace: '---\n    at'
    },
    {
      format: /\s+at /g,
      replace: '\n    at '
    },
    {
      format: /--- End of inner exception stack trace ---/g, 
      replace: '\n    --- End of inner exception stack trace ---'
    },
    {
      format: /--->/g,
      replace: '\n  --->'
    },
    {
      format: /Caused by:/g,
      replace: '\nCaused by:'
    },
    {
      format: /   \.\.\. /g,
      replace: '\n   ... '
    },
    {
      format: /\s+\n/g, 
      replace: '\n'
    },
  ]

  replacementTokens.forEach(token => {
      result = result.replace(token.format, token.replace);
  });

  return result;
}

removeNewLines = (stackTrace) =>  {
  return stackTrace.replace(/(\r\n|\r|\n)/g, '');
}


// function initializeSelectionComponent() {
//   const selected = document.querySelector(".selected");
//   const optionsContainer = document.querySelector(".options-container");

//   const optionsList = document.querySelectorAll(".option");

//   selected.addEventListener("click", () => {
//     optionsContainer.classList.toggle("active");
//   });

//   optionsList.forEach(o => {
//     o.addEventListener("click", () => {
//       selected.innerHTML = o.querySelector("label").innerHTML;
//       optionsContainer.classList.remove("active");
//     });
//   });
// }



