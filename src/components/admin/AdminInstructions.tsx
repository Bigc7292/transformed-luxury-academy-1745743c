import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, Info, HelpCircle, Image, FileText, Inbox } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AdminInstructions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Card className="mb-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-salon-pink-500" />
              <div>
                <CardTitle>Admin Instructions</CardTitle>
                <CardDescription>
                  Click to {isOpen ? 'hide' : 'view'} instructions on how to manage your website content
                </CardDescription>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="content">Content Management</TabsTrigger>
                <TabsTrigger value="media">Media Showcase</TabsTrigger>
                <TabsTrigger value="inquiries">Customer Inquiries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h3 className="text-lg font-medium flex items-center gap-2 text-blue-700 mb-2">
                      <Info className="h-5 w-5" /> Welcome to Your Admin Dashboard
                    </h3>
                    <p className="text-blue-700 mb-2">
                      This admin panel allows you to manage all aspects of your website content without needing technical assistance.
                    </p>
                    <ul className="list-disc pl-5 text-blue-700 space-y-1">
                      <li>Use the navigation tabs at the top to switch between different management sections</li>
                      <li>All changes you make will be immediately reflected on the website</li>
                      <li>You can always return to these instructions by clicking the header above</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Admin Sections Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-salon-pink-500" />
                          <h4 className="font-medium">General Content</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Manage content across your entire website including home page, services, and more.
                        </p>
                      </Card>
                      
                      <Card className="p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Image className="h-5 w-5 text-salon-pink-500" />
                          <h4 className="font-medium">Media Showcase</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Manage your media gallery with images and videos organized by categories.
                        </p>
                      </Card>
                      
                      <Card className="p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Inbox className="h-5 w-5 text-salon-pink-500" />
                          <h4 className="font-medium">Customer Inquiries</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          View and respond to messages sent by customers through your website.
                        </p>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="content">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Content Management Instructions</h3>
                    <p className="text-gray-600 mb-4">
                      The Content Management section allows you to control all the content displayed across your website.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                      <h4 className="font-medium mb-2">Adding New Content</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                        <li>Click the <span className="font-medium">Add Content</span> button at the top of the page</li>
                        <li>Fill in the required fields (Title, URL, etc.)</li>
                        <li>Select the appropriate category for your content</li>
                        <li>Choose where on the website this content should appear using the Page Location and Page Section fields</li>
                        <li>Toggle the Active switch to make the content visible on the website</li>
                        <li>Click Save to publish your content</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                      <h4 className="font-medium mb-2">Editing Existing Content</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                        <li>Find the content you want to edit in the list</li>
                        <li>Click the Edit button on that content item</li>
                        <li>Make your changes in the edit dialog</li>
                        <li>Click Update to save your changes</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <h4 className="font-medium mb-2">Understanding Page Locations and Sections</h4>
                      <p className="text-gray-700 mb-2">
                        Content can be placed in different areas of your website using these settings:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li><span className="font-medium">Page Location</span>: The page where the content will appear (Home, About, Services, etc.)</li>
                        <li><span className="font-medium">Page Section</span>: The specific area on that page (Hero Banner, Featured Content, Carousel, etc.)</li>
                        <li><span className="font-medium">Active</span>: Controls whether the content is visible or hidden on the website</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="media">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Media Showcase Management</h3>
                    <p className="text-gray-600 mb-4">
                      The Media Showcase section allows you to manage all media content that will be available to administrators but not publicly visible on the website.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                      <h4 className="font-medium mb-2">Adding Media Content</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                        <li>Click the <span className="font-medium">Add Media</span> button at the top of the page</li>
                        <li>Fill in the title and description for your media</li>
                        <li>Select the appropriate category (Promotional, Staff, Awards, CEO, Founder, etc.)</li>
                        <li>Choose the media type (Image or Video)</li>
                        <li>Upload your media file or provide a URL</li>
                        <li>For videos, you can also upload a thumbnail image</li>
                        <li>Make sure the Page Location is set to "Media Showcase Page"</li>
                        <li>Select the appropriate Page Section (Featured, Gallery, Videos)</li>
                        <li>Click Save to add your media</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                      <h4 className="font-medium mb-2">Organizing Media by Categories</h4>
                      <p className="text-gray-700 mb-2">
                        Your media content is organized into these categories:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li><span className="font-medium">Promotional</span>: Marketing materials and promotional content</li>
                        <li><span className="font-medium">Staff</span>: Photos and videos of your staff members</li>
                        <li><span className="font-medium">Awards</span>: Recognition and achievements</li>
                        <li><span className="font-medium">CEO</span>: Content related to the CEO</li>
                        <li><span className="font-medium">Founder</span>: Content related to the founder</li>
                        <li><span className="font-medium">Videos</span>: All video content</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <h4 className="font-medium mb-2">Tips for Media Management</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Use high-quality images (recommended size: 1200x800 pixels)</li>
                        <li>Keep video files under 50MB for better performance</li>
                        <li>Add descriptive titles and descriptions to help with organization</li>
                        <li>Use the View button to preview how your media will appear</li>
                        <li>Regularly review and update your media content to keep it fresh</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="inquiries">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Managing Customer Inquiries</h3>
                    <p className="text-gray-600 mb-4">
                      The Customer Inquiries section allows you to view and respond to messages sent by visitors through your website's contact form.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                      <h4 className="font-medium mb-2">Viewing Inquiries</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>All customer messages are listed with the most recent at the top</li>
                        <li>Each inquiry shows the customer's name, email, topic, and message</li>
                        <li>The status indicator shows whether the inquiry is new, in progress, or resolved</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                      <h4 className="font-medium mb-2">Responding to Inquiries</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                        <li>Click on an inquiry to view its full details</li>
                        <li>Use the status dropdown to mark inquiries as "In Progress" or "Resolved"</li>
                        <li>Contact the customer directly via email or phone using the provided contact information</li>
                        <li>After responding, update the status to "Resolved"</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <h4 className="font-medium mb-2">Best Practices</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Check for new inquiries regularly (daily if possible)</li>
                        <li>Respond to inquiries within 24-48 hours</li>
                        <li>Use the topic field to prioritize urgent inquiries</li>
                        <li>Keep track of inquiry status to ensure all messages are addressed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AdminInstructions;
