/**
 * 
 * System.Exception: Test outer exceptio ---> System.Exception: Hello Exceptionat TestExceptionGenerator.Spike.GetException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 29    at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 36     --- End of inner exception stack trace ---     at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 41     at TestExceptionGenerator.Spike.<GenericExceptionWithInnerException>b__1() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 21     at TestExceptionGenerator.Extensions.GetExceptionString(Action action) in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 56 
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

document.addEventListener("load", () => { 
  console.log("load...")
});


document.addEventListener("DOMContentLoaded", () => { 
  console.log("DOMContentLoaded...")
  initializeTheme();
  initializeSaveToClipboard();

  let inputBox = document.getElementById('input');
  let outputBox = document.getElementById('output');
  let clearBtn = document.getElementById('clearBtn');
  let settingsBtn = document.getElementById('settingsBtn');

  inputBox.addEventListener('paste', (event) => {

    let paste = (event.clipboardData || window.clipboardData).getData('text');
    inputBox.value = paste;

    outputBox.value = formatStackTrace(paste);
    if (isSaveToClipboardToggled()) {
      copyToClipboard();
    }

  });

  inputBox.addEventListener('keydown', (event) => {
   
    if (event.key === 'Enter') {
      event.preventDefault();

      outputBox.value = formatStackTrace(inputBox.value);
      if (isSaveToClipboardToggled()) {
        copyToClipboard();
      }
    }
  });

  clearBtn.addEventListener('click', () => {
    inputBox.value = '';
    outputBox.value = '';
  })

  settingsBtn.addEventListener('click', () => {
    openModal();
  })

});

openModal = () => {
  var modalContent = document.getElementById('modal-content');
  var modalBackground = document.getElementById('modal-bg');

  initializeModal();

  modalContent.classList.add('open');
  modalBackground.classList.add('open');
}

// Modal is initialized as many times as we click settings btn
initializeModal = () => {
  
  var saveButton = document.getElementById('saveBtn');
  var closeButton = document.getElementById('closeBtn');
  var closeXButton = document.getElementById('closeXBtn');
  var copyToClipboardToggle = document.getElementById('toggleCopyToClipboard');
  var darkThemeToggle = document.getElementById('toggleDarkTheme');

  var modalContent = document.getElementById('modal-content');
  var modalBackground = document.getElementById('modal-bg');
  
  initializeSaveToClipboardToggle();
  initializeDarkThemeToggle();

  darkThemeToggle.addEventListener("change", function() {
    if (darkThemeToggle.checked) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  });

  saveButton.addEventListener("click", function() {

    if (copyToClipboardToggle.checked) {
      chrome.storage.local.set({'copyToClipboardToggle': true}, function() {
        console.log('Value is set to ' + true);
      });
    } else {
      chrome.storage.local.set({'copyToClipboardToggle': false}, function() {
        console.log('Value is set to ' + false);
      });
    }

    if (darkThemeToggle.checked) {
      chrome.storage.local.set({'darkThemeToggle': true}, function() {
        console.log('Value is set to ' + true);
      });
    } else {
      chrome.storage.local.set({'darkThemeToggle': false}, function() {
        console.log('Value is set to ' + false);
      });
    }

    modalContent.classList.remove('open');
    modalBackground.classList.remove('open');
  });

  closeButton.addEventListener("click", function() {
    modalContent.classList.remove('open');
    modalBackground.classList.remove('open');
  });

  closeXButton.addEventListener("click", function() {
    modalContent.classList.remove('open');
    modalBackground.classList.remove('open');
  });
}

initializeSaveToClipboard = () => {
  chrome.storage.local.get('copyToClipboardToggle', function(result) {
    console.log('copyToClipboardToggle storage value: ', JSON.stringify(result));
    if (Object.keys(result).length === 0) { 
      chrome.storage.local.set({'copyToClipboardToggle': false}, function() {
        console.log('copyToClipboardToggle is set to ' + false);
      });
    }
  });
}

initializeSaveToClipboardToggle = () => {
  var toggle = document.querySelector("#toggleCopyToClipboard");
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

isSaveToClipboardToggled = () => {
  var toggle = document.querySelector("#toggleCopyToClipboard");
  if (toggle.checked) {
    console.log("toggleCopyToClipboard checked");
    return true;
  } else {
    console.log("toggleCopyToClipboard un-checked")
    return false;
  }
}

initializeTheme = () => {
  chrome.storage.local.get('darkThemeToggle', function(result) {
    console.log('darkThemeToggle storage value: ', JSON.stringify(result));
    if (Object.keys(result).length === 0) { 
      chrome.storage.local.set({'darkThemeToggle': false}, function() {
        console.log('darkThemeToggle is set to ' + false);
      });
      // setTheme(false);
    } else {
      setTheme(result.darkThemeToggle);
    }
  });
}

initializeDarkThemeToggle = () => {
  var toggle = document.querySelector("#toggleDarkTheme");
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

isDarkThemeToggled = () => {
  var darkThemeToggle = document.querySelector("#toggleDarkTheme");
  if (darkThemeToggle.checked) {
    console.log("toggleDarkTheme checked");
    return true;
  } else {
    console.log("toggleDarkTheme un-checked")
    return false;
  }
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
  }, 1000);
}

copyToClipboard = () => {
  var copyText = document.querySelector("#output");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  console.log("Text coppied to clipboard");
  // alert("Copied the text: " + copyText.value);
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



