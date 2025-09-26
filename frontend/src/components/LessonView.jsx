import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, CheckCircle, AlertTriangle, Info, Target } from 'lucide-react';
import { courses } from '../comprehensive_course_data';

// Custom function to parse markdown tables manually
const parseMarkdownTable = (content) => {
  // Split content into lines and find table patterns
  const lines = content.split('\n');
  let result = content;
  
  for (let i = 0; i < lines.length - 2; i++) {
    const currentLine = lines[i].trim();
    const nextLine = lines[i + 1].trim();
    
    // Check if current line looks like a table header and next line is separator
    if (currentLine.includes('|') && nextLine.match(/^\|[\s\-:|]+\|$/)) {
      // Found a table header and separator
      const headers = currentLine.split('|').map(h => h.trim()).filter(h => h);
      
      if (headers.length > 0) {
        // Find all table rows
        const tableRows = [];
        let j = i + 2; // Start after separator
        
        while (j < lines.length && lines[j].trim().includes('|')) {
          const rowData = lines[j].split('|').map(cell => cell.trim()).filter(cell => cell);
          if (rowData.length > 0) {
            tableRows.push(rowData);
          }
          j++;
        }
        
        if (tableRows.length > 0) {
          // Build HTML table
          let tableHtml = '<div class="overflow-x-auto my-6"><table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">';
          
          // Header
          tableHtml += '<thead class="bg-orange-50"><tr>';
          headers.forEach(header => {
            tableHtml += `<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">${header}</th>`;
          });
          tableHtml += '</tr></thead>';
          
          // Body
          tableHtml += '<tbody class="bg-white divide-y divide-gray-200">';
          tableRows.forEach((row, index) => {
            tableHtml += `<tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">`;
            for (let k = 0; k < headers.length; k++) {
              const cellContent = row[k] || '';
              tableHtml += `<td class="px-6 py-4 text-sm text-gray-900 border-b border-gray-100">${cellContent}</td>`;
            }
            tableHtml += '</tr>';
          });
          tableHtml += '</tbody></table></div>';
          
          // Replace the original table markdown with HTML
          const originalTable = lines.slice(i, j).join('\n');
          result = result.replace(originalTable, tableHtml);
        }
      }
    }
  }
  
  return result;
};

// Function to process markdown content
const processMarkdownContent = (content) => {
  return parseMarkdownTable(content)
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-800 mb-3 mt-6 flex items-center"><span class="w-5 h-5 text-orange-600 mr-2">🎯</span>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-800 mb-4 mt-8">$1</h2>')
    .replace(/^# (.*$)/gm, '') // Hide H1 to avoid duplication
    // Images
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="my-8 text-center"><img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-lg mx-auto" style="max-height: 500px;" onerror="this.style.display=\'none\'"/><p class="text-sm text-gray-500 mt-2 italic">$1</p></div>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center">$1 <span class="ml-1">↗</span></a>')
    // Blockquotes
    .replace(/^> (.*$)/gm, '<div class="border-l-4 border-orange-500 bg-orange-50 p-4 my-6 rounded-r-lg"><div class="flex items-start"><span class="text-orange-600 mr-3">ℹ️</span><div class="text-orange-800">$1</div></div></div>')
    // Paragraphs
    .split('\n\n')
    .map(paragraph => {
      if (paragraph.trim() === '') return '';
      if (paragraph.startsWith('<div') || paragraph.startsWith('<h') || paragraph.startsWith('<table')) {
        return paragraph;
      }
      return `<p class="text-gray-700 leading-relaxed mb-4">${paragraph.trim()}</p>`;
    })
    .join('\n');
};

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const currentCourse = courses.find(c => c.id === parseInt(courseId));
      if (currentCourse) {
        const currentLesson = currentCourse.lessons.find(l => l.id === parseInt(lessonId));
        setCourse(currentCourse);
        setLesson(currentLesson || null);
      }
      setLoading(false);
    }, 500);
  }, [courseId, lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h2>
          <p className="text-gray-600 mb-4">The lesson you're looking for doesn't exist.</p>
          <Link
            to={`/course/${courseId}`}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/course/${courseId}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {course.title}
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-gray-500 mb-6">Duration: {lesson.duration}</p>
          
          <div className="prose max-w-none">
            <div 
              dangerouslySetInnerHTML={{
                __html: processMarkdownContent(lesson.content)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
