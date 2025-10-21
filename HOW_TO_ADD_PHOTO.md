# 📸 How to Add Your Profile Photo

## Quick Steps

1. **Save your photo:**
   - Right-click on your photo image
   - Select "Save As..."
   - Save it as `photo.jpg` in the `public` folder
   - Full path: `e:\portflio\public\photo.jpg`

2. **That's it!** 
   - Your photo will automatically appear in the About section
   - It will display as a circular profile picture with a glowing effect

## File Location

```
e:\portflio\
└── public\
    └── photo.jpg  ← Save your photo here
```

## Supported Formats

You can use:
- `.jpg` or `.jpeg`
- `.png`
- `.webp`

If you use a different name or format, update `public/profile.json`:

```json
{
  "photo": "/your-photo-name.png"
}
```

## Photo Recommendations

- **Size:** 500x500 pixels minimum
- **Format:** Square (1:1 ratio)
- **File size:** Under 200KB for fast loading
- **Quality:** High resolution, well-lit

Your photo is already configured in the code! Just save it to the public folder. 🎉
