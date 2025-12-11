#!/bin/bash

# Forum System Deployment Checklist
# Run this script to verify all components are in place

echo "🔍 Forum System Deployment Checklist"
echo "======================================"
echo ""

# Check for migration file
echo "📄 Checking migration files..."
if [ -f "scripts/forum-migration.sql" ]; then
    echo "  ✅ forum-migration.sql exists"
else
    echo "  ❌ forum-migration.sql NOT FOUND"
fi

if [ -f "scripts/seed-forum-with-users.sql" ]; then
    echo "  ✅ seed-forum-with-users.sql exists"
else
    echo "  ❌ seed-forum-with-users.sql NOT FOUND"
fi

echo ""

# Check for component files
echo "🧩 Checking component files..."
components=(
    "src/components/forum/NewPostForm.tsx"
    "src/components/forum/EditPostForm.tsx"
    "src/components/forum/PostDeleteButton.tsx"
    "src/components/forum/CommentSection.tsx"
)

for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo "  ✅ $(basename $component) exists"
    else
        echo "  ❌ $(basename $component) NOT FOUND"
    fi
done

echo ""

# Check for page files
echo "📱 Checking page files..."
pages=(
    "src/app/forum/page.tsx"
    "src/app/forum/new/page.tsx"
    "src/app/forum/[id]/page.tsx"
    "src/app/forum/[id]/edit/page.tsx"
)

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "  ✅ $(basename $(dirname $page))/$(basename $page) exists"
    else
        echo "  ❌ $(basename $(dirname $page))/$(basename $page) NOT FOUND"
    fi
done

echo ""

# Check for documentation
echo "📚 Checking documentation..."
if [ -f "FORUM_IMPLEMENTATION.md" ]; then
    echo "  ✅ FORUM_IMPLEMENTATION.md exists"
else
    echo "  ❌ FORUM_IMPLEMENTATION.md NOT FOUND"
fi

if [ -f "FORUM_QUICK_START.md" ]; then
    echo "  ✅ FORUM_QUICK_START.md exists"
else
    echo "  ❌ FORUM_QUICK_START.md NOT FOUND"
fi

echo ""
echo "======================================"
echo ""
echo "📋 Next Steps:"
echo "1. ⚡ Run scripts/forum-migration.sql in Supabase SQL Editor"
echo "2. 👤 Sign up a test user at /auth/signup"
echo "3. 🌱 Run scripts/seed-forum-with-users.sql (optional)"
echo "4. 🧪 Test the forum at /forum"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - FORUM_QUICK_START.md (getting started)"
echo "   - FORUM_IMPLEMENTATION.md (technical details)"
echo ""
