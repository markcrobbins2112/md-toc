---
obsidianUIMode: preview
collapsed: true
---
# MD-TOC


111

<details>
<summary>X</summary>

```javascript
const fs = require('fs');
console.log("This will now render perfectly in Obsidian!");
```

</details>


xxx

#### Example 2: Structural Nesting
```thematic
// --- UNGRAPHED ---
// #region aa.
// Basename: aa

//   #region inner.
//   Basename: inner
//   #endregion inner.

// #endregion aa.

// --- GRAPHED ---
// #region aa.
// Basename: aa

//   #region aa.inner.
//   Graphed State: Inherits parent path prefix
//   Basename: inner
//   #endregion aa.inner.

// #endregion aa.
```


````markdown
## 📂 src/build.js
```javascript
const fs = require('fs');
console.log("Obsidian folds this entire code block automatically under the heading!");
```
````


# j
jj

```javascript
const fs = require('fs');
console.log("Obsidian folds this entire code block automatically under the heading!");
```
