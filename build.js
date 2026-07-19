/**
 * 🛠️ AUTOMATED TABLE OF CONTENTS ENGINE & REFACTORING COMPILER
 *
 * DESIGN SPECIFICATIONS:
 * ============================================================================
 * Case 1 / Form B Link Format:  <a id="a-X"></a>[TOC](#toc-X)
 * Case 2 / Form A Index Format: - [X](#a-Y) <a id="toc-Y"></a> ^toc-Y
 * Target Destination Header:    ## X
 *
 * PIPELINE WORKFLOW (IDEMPOTENT / IN-PLACE REGENERATION):
 * ============================================================================
 * 1. Read absolute file path provided in terminal arguments (Process Parameter 1).
 * 2. Sanitize buffer: Discard previous table items and [TOC] tags line-by-line.
 * 3. Tokenize headings: Standardize names ("X") down to alphanumeric key slugs.
 * 4. Structural routing: Rewrite Form A arrays beneath EVERY "<!-- TOC location -->".
 * 5. Button injection: Place Form B [TOC] anchor references cleanly below headings.
 * 6. Commit to disk: Overwrite the active source file layout matrix securely.
 *
 * EXECUTION SCHEMAS:
 * ============================================================================
 * Standard invocation:  node generate-toc.js path/to/note.md
 * Relative path maps:   node generate-toc.js ./vault/testing/test-1.md
 */

// START FILENAME: generate-toc.js
const fs = require('fs');
const path = require('path');

function compileMarkdownFile() {
    // 1. Validate argument parameter presence (Expects source file as Parameter 1)
    const sourceArg = process.argv[2];
    if (!sourceArg) {
        console.error("❌ Critical Error: Missing argument. Please provide a source file path.");
        console.log("👉 Usage: node generate-toc.js path/to/file.md");
        process.exit(1);
    }

    const absoluteSourcePath = path.resolve(sourceArg);
    if (!fs.existsSync(absoluteSourcePath)) {
        console.error(`❌ Critical Error: Source file missing at location: ${absoluteSourcePath}`);
        process.exit(1);
    }

    // 2. Output path set directly to overwrite the source file in place
    const absoluteOutputPath = absoluteSourcePath;

    console.log("=========================================");
    console.log(`🔄 Overwriting Target In-Place: ${absoluteSourcePath}`);
    console.log("=========================================");

    const rawContent = fs.readFileSync(absoluteSourcePath, 'utf8');
    const rawLines = rawContent.split(/\r?\n/);

    let sanitizedLines = [];

    // --- STEP 1: PRE-CLEANUP SWEEP (STRIP PAST TRANSFORMATION ARTIFACTS) ---
    for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i].trim();

        // Strip previous Case B [TOC] buttons entirely
        if (line.match(/^<a\s+id=["']a-[^"']+["']><\/a>\[TOC\]\s*\((?:#\^?)(?:toc-[^)]+)\)$/i)) {
            continue;
        }

        // Detect and strip out existing Table of Contents blocks entirely
        if (line === "## 🔍 Table of Contents") {
            while (i + 1 < rawLines.length) {
                const nextLine = rawLines[i + 1].trim();
                if (nextLine.startsWith("- [") || nextLine.startsWith("<!-- Maintained") || nextLine === "") {
                    i++;
                } else {
                    break;
                }
            }
            continue;
        }

        sanitizedLines.push(rawLines[i]);
    }

    // --- STEP 2: PARSE HEADINGS AND INJECT DETERMINISTIC TARGETS ---
    let headingsMetadata = [];
    let processedLines = [];

    for (let i = 0; i < sanitizedLines.length; i++) {
        const currentLine = sanitizedLines[i];
        const headingMatch = currentLine.match(/^##\s+(.+)$/);

        if (headingMatch) {
            const rawHeadingText = headingMatch[1].trim();
            const slugKey = rawHeadingText.toLowerCase().replace(/[^a-z0-9]/g, '');

            headingsMetadata.push({
                rawText: rawHeadingText,
                slug: slugKey
            });

            processedLines.push(`## ${rawHeadingText}`);
            processedLines.push(`<a id="a-${slugKey}"></a>[TOC](#toc-${slugKey})`);
        } else {
            processedLines.push(currentLine);
        }
    }

    // --- STEP 3: BUILD THE FRESH FORM A TABLE OF CONTENTS BLOCK ---
    let tocPayloadBlocks = [
        "",
        "## 🔍 Table of Contents",
        "<!-- Maintained by script -->"
    ];

    for (const h of headingsMetadata) {
        tocPayloadBlocks.push(`- [${h.rawText}](#a-${h.slug}) <a id="toc-${h.slug}"></a> ^toc-${h.slug}`);
    }

    // --- STEP 4: PLACE NEW TOC AT *ALL* LOCATION MARKERS ---
    let finalPayloadLines = [];
    let tocCounter = 0;

    for (let i = 0; i < processedLines.length; i++) {
        const line = processedLines[i];
        finalPayloadLines.push(line);

        if (line.trim() === "<!-- TOC location -->") {
            finalPayloadLines.push(...tocPayloadBlocks);
            tocCounter++;
        }
    }

    if (tocCounter === 0) {
        console.warn("⚠️ Warning: Could not find any '<!-- TOC location -->' tags. File written without a TOC.");
    }

    // Write final packaged text buffer directly back into your active note file
    fs.writeFileSync(absoluteOutputPath, finalPayloadLines.join('\n'), 'utf8');
    console.log("=========================================");
    console.log(`🚀 AUTO-OVERWRITE SUCCESSFUL! Regenerated ${tocCounter} TOC instances inside file layout frame.`);
    console.log("=========================================");
}

compileMarkdownFile();
// END FILENAME: generate-toc.js
