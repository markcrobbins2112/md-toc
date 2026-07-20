---
obsidianUIMode: preview
collapsed: true
---
# MD-TOC


00
<details>
<summary style="background: var(--color-canvas-subtle); color: var(--color-fg-default); font-weight: bold; padding: 6px 12px; cursor: pointer;">📂 View Core Implementation Details</summary>

```javascript
console.log("This block renders flawlessly on GitHub in both dark and light modes!");
```

</details>


111

<details>
<summary style="background: var(--color-canvas-subtle, --background-secondary, #2d3139); color: var(--text-normal, #abb2bf); padding: 4px 12px; font-family: monospace; font-size: 12px; border-top-left-radius: 4px; border-top-right-radius: 4px; border-bottom: 1px solid var(--border-color, #3e4452); cursor: pointer; user-select: none;">X</summary>

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
