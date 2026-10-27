# How to update the website 🎨

Hi Alissa! You can manage your whole website yourself just by **adding, renaming, or deleting image files** — no code needed. This guide explains how.

All your paintings live in one folder:

```
public/images
```

Whatever is in that folder is what appears on the website.

---

## The naming rule

Every painting file **must be named like this**:

```
group_name-of-the-painting_sizeXsize.jpg
```

Three parts, separated by underscores ( `_` ):

| Part      | What it means                                                                               | Example           |
| --------- | ------------------------------------------------------------------------------------------- | ----------------- |
| **group** | Where it shows up: `col1`, `col2`, `col3`… for a collection, or `others` for _Current Work_ | `col1`            |
| **name**  | The title. Use dashes ( `-` ) instead of spaces. All lowercase.                             | `entre-mar-y-cel` |
| **size**  | Canvas size in centimetres, as `widthXheight`                                               | `100x100`         |

Put it together:

```
col1_entre-mar-y-cel_100x100.jpg
```

On the website this automatically becomes:

> **Entre Mar y Cel** — 100 × 100 cm (in Collection I)

More examples:

```
col1_aigua-cristalina_50x60.jpg   →  "Aigua Cristalina", Collection I
col2_delfina_60x50.jpg            →  "Delfina",          Collection II
others_amor_130x100.jpg           →  "Amor",             Current Work
```

---

## Common things you'll want to do

### ➕ Add a painting

Drop a correctly-named image into `public/images`. That's it — it appears automatically.

### 🗑️ Remove a painting

Delete its file from `public/images`.

### ✏️ Rename a painting or fix its size

Rename the file (keep the rule above). The title and size on the site update to match.

### 📚 Add a whole new collection

Use the next number: name files `col3_...`, `col4_...`, etc. A new **“Collection III”** page, home-page card, and menu link are created automatically.

---

## ⚠️ Three important rules

1. **Only use `.jpg`, `.png`, `.webp`, or `.avif` images.**
   Photos straight from an iPhone are usually `.heic` and **will not work** — open the photo and export/save it as **JPG** first.

2. **No spaces or capital letters in the file name.** Use lowercase and dashes:
   - ✅ `col1_full-moon_50x80.jpg`
   - ❌ `col1_Full Moon_50x80.JPG`

3. **Keep the three underscores** separating group / name / size. If a file doesn't follow the pattern, it's simply ignored (it won't break the site).

---

## The artist photo

The photo of you on the home page is the file:

```
public/images/alissa.jpg
```

To change it, just replace that file with a new photo using the **same name** (`alissa.jpg`).

---

## A couple of other notes

- **Order on the page:** paintings are listed alphabetically by title.
- **Seeing your changes live:** after editing files, the site needs to be rebuilt/published. If someone set up automatic publishing, changes go live on their own; otherwise ask your developer to publish. (During editing on a computer, run `pnpm dev` and open http://localhost:3000.)

---

Happy painting! 💙
