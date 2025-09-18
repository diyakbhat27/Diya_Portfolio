#!/bin/bash

# Image optimization script for portfolio
# Requires ImageMagick and optipng to be installed

echo "🖼️  Portfolio Image Optimization Script"
echo "======================================"

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "❌ ImageMagick not found. Please install ImageMagick first."
    echo "   Windows: Download from https://imagemagick.org/script/download.php#windows"
    echo "   macOS:   brew install imagemagick"
    echo "   Linux:   sudo apt-get install imagemagick"
    exit 1
fi

# Check if optipng is installed
if ! command -v optipng &> /dev/null; then
    echo "⚠️  optipng not found. PNG optimization will be skipped."
    echo "   Install with: brew install optipng (macOS) or apt-get install optipng (Linux)"
    OPTIMIZE_PNG=false
else
    OPTIMIZE_PNG=true
fi

# Create directories
echo "📁 Creating image directories..."
mkdir -p public/assets/optimized
mkdir -p public/projects/optimized
mkdir -p public/blog/optimized

# Function to optimize image
optimize_image() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local ext="${filename##*.}"
    
    echo "🔄 Processing: $filename"
    
    # Create different sizes for responsive images
    case "$ext" in
        jpg|jpeg|JPG|JPEG)
            # Original size (max 1920px width)
            magick "$input_file" -resize "1920x1920>" -quality 85 "$output_dir/${name}.jpg"
            
            # Large (1200px)
            magick "$input_file" -resize "1200x1200>" -quality 85 "$output_dir/${name}-lg.jpg"
            
            # Medium (800px)  
            magick "$input_file" -resize "800x800>" -quality 85 "$output_dir/${name}-md.jpg"
            
            # Small (400px)
            magick "$input_file" -resize "400x400>" -quality 85 "$output_dir/${name}-sm.jpg"
            
            # WebP versions for better compression
            magick "$input_file" -resize "1920x1920>" -quality 80 "$output_dir/${name}.webp"
            magick "$input_file" -resize "1200x1200>" -quality 80 "$output_dir/${name}-lg.webp"
            magick "$input_file" -resize "800x800>" -quality 80 "$output_dir/${name}-md.webp"
            magick "$input_file" -resize "400x400>" -quality 80 "$output_dir/${name}-sm.webp"
            ;;
            
        png|PNG)
            # PNG optimization
            magick "$input_file" -resize "1920x1920>" "$output_dir/${name}.png"
            magick "$input_file" -resize "1200x1200>" "$output_dir/${name}-lg.png" 
            magick "$input_file" -resize "800x800>" "$output_dir/${name}-md.png"
            magick "$input_file" -resize "400x400>" "$output_dir/${name}-sm.png"
            
            # Optimize PNG files if optipng is available
            if [ "$OPTIMIZE_PNG" = true ]; then
                optipng -o7 "$output_dir/${name}.png" 2>/dev/null
                optipng -o7 "$output_dir/${name}-lg.png" 2>/dev/null  
                optipng -o7 "$output_dir/${name}-md.png" 2>/dev/null
                optipng -o7 "$output_dir/${name}-sm.png" 2>/dev/null
            fi
            
            # WebP versions
            magick "$input_file" -resize "1920x1920>" -quality 80 "$output_dir/${name}.webp"
            magick "$input_file" -resize "1200x1200>" -quality 80 "$output_dir/${name}-lg.webp"
            magick "$input_file" -resize "800x800>" -quality 80 "$output_dir/${name}-md.webp" 
            magick "$input_file" -resize "400x400>" -quality 80 "$output_dir/${name}-sm.webp"
            ;;
            
        svg|SVG)
            # Just copy SVG files (they're already optimized)
            cp "$input_file" "$output_dir/"
            echo "  ✅ SVG copied (no optimization needed)"
            ;;
            
        *)
            echo "  ⚠️  Unsupported format: $ext"
            ;;
    esac
    
    echo "  ✅ Optimized: $filename"
}

# Process avatar images
echo ""
echo "👤 Processing avatar images..."
if [ -f "public/assets/avatar.jpg" ]; then
    optimize_image "public/assets/avatar.jpg" "public/assets/optimized"
elif [ -f "public/assets/avatar.png" ]; then
    optimize_image "public/assets/avatar.png" "public/assets/optimized"
else
    echo "  ⚠️  No avatar image found (avatar.jpg or avatar.png)"
fi

# Process project images
echo ""
echo "🚀 Processing project images..."
for file in public/projects/*; do
    if [ -f "$file" ]; then
        optimize_image "$file" "public/projects/optimized"
    fi
done

# Process blog images (if any)
echo ""
echo "📝 Processing blog images..."
if [ -d "public/blog" ]; then
    for file in public/blog/*; do
        if [ -f "$file" ]; then
            optimize_image "$file" "public/blog/optimized"
        fi
    done
else
    echo "  📝 No blog images directory found"
fi

# Generate responsive image component helper
echo ""
echo "⚛️  Generating responsive image component..."
cat > components/ResponsiveImage.jsx << 'EOF'
import Image from 'next/image'

export default function ResponsiveImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false 
}) {
  const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, '')
  const ext = src.match(/\.(jpg|jpeg|png)$/i)?.[1] || 'jpg'
  
  return (
    <picture className={className}>
      <source 
        srcSet={`
          ${baseSrc}-sm.webp 400w,
          ${baseSrc}-md.webp 800w,
          ${baseSrc}-lg.webp 1200w,
          ${baseSrc}.webp 1920w
        `}
        sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1536px) 1200px, 1920px"
        type="image/webp"
      />
      <source 
        srcSet={`
          ${baseSrc}-sm.${ext} 400w,
          ${baseSrc}-md.${ext} 800w, 
          ${baseSrc}-lg.${ext} 1200w,
          ${baseSrc}.${ext} 1920w
        `}
        sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1536px) 1200px, 1920px"
        type={`image/${ext === 'jpg' ? 'jpeg' : ext}`}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        priority={priority}
      />
    </picture>
  )
}
EOF

# Generate optimization report
echo ""
echo "📊 Generating optimization report..."
{
    echo "# Image Optimization Report"
    echo "Generated on: $(date)"
    echo ""
    echo "## Optimized Images:"
    echo ""
    
    find public -name "*optimized*" -type d | while read dir; do
        echo "### $(basename $(dirname $dir))"
        ls -la "$dir" 2>/dev/null | grep -v "^total" | awk '{print "- " $9 " (" $5 " bytes)"}'
        echo ""
    done
    
    echo "## Usage Instructions:"
    echo ""
    echo "1. Replace image paths in your components with optimized versions"
    echo "2. Use the ResponsiveImage component for automatic responsive loading"
    echo "3. Update data.json paths to point to optimized images"
    echo ""
    echo "Example:"
    echo '```jsx'
    echo 'import ResponsiveImage from "./components/ResponsiveImage"'
    echo ''
    echo '<ResponsiveImage'
    echo '  src="/assets/optimized/avatar.jpg"'
    echo '  alt="Profile photo"' 
    echo '  width={200}'
    echo '  height={200}'
    echo '  priority={true}'
    echo '/>'
    echo '```'
} > OPTIMIZATION_REPORT.md

echo ""
echo "✅ Image optimization complete!"
echo "📊 Check OPTIMIZATION_REPORT.md for details"
echo "⚛️  Use components/ResponsiveImage.jsx for responsive images"
echo ""
echo "💡 Next steps:"
echo "   1. Update image paths in data.json to use optimized versions"
echo "   2. Replace <img> tags with ResponsiveImage component"
echo "   3. Test loading performance improvements"
