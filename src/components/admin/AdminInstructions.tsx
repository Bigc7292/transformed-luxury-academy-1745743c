import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, Info, HelpCircle, Image, FileText, Inbox } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AdminInstructions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Card className="mb-8 max-w-full overflow-hidden border-gold-500/10 bg-zinc-950/20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-gold-500" />
              <div>
                <CardTitle className="text-left text-zinc-100">Admin Instructions</CardTitle>
                <CardDescription className="text-left text-zinc-400">
                  Click to {isOpen ? 'hide' : 'view'} instructions on how to manage your website content
                </CardDescription>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-zinc-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-zinc-400" />
            )}
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="overflow-x-auto pt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 flex flex-wrap gap-2 bg-zinc-900/50 border border-zinc-800">
                <TabsTrigger value="general" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">General</TabsTrigger>
                <TabsTrigger value="content" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">Content Management</TabsTrigger>
                <TabsTrigger value="media" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">Media Showcase</TabsTrigger>
                <TabsTrigger value="inquiries" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">Customer Inquiries</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="space-y-4">
                  <div className="bg-gold-950/20 p-4 rounded-md border border-gold-500/20">
                    <h3 className="text-lg font-medium flex items-center gap-2 text-gold-500 mb-2 font-serif">
                      <Info className="h-5 w-5 text-gold-500" /> Welcome to Your Admin Dashboard
                    </h3>
                    <p className="text-zinc-300 mb-2">
                      This admin panel allows you to manage all aspects of your website content without needing technical assistance.
                    </p>
                    <ul className="list-disc pl-5 text-zinc-400 space-y-1">
                      <li>Use the navigation tabs at the top to switch between different management sections</li>
                      <li>All changes you make will be immediately reflected on the website</li>
                      <li>You can always return to these instructions by clicking the header above</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-zinc-100 font-serif">Admin Sections Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <Card className="p-4 border border-zinc-800 bg-zinc-900/20 text-zinc-300">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-gold-500" />
                          <h4 className="font-medium text-zinc-100 font-serif">General Content</h4>
                        </div>
                        <p className="text-sm text-zinc-400">
                          Manage content across your entire website including home page, services, and more.
                        </p>
                      </Card>

                      <Card className="p-4 border border-zinc-800 bg-zinc-900/20 text-zinc-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Image className="h-5 w-5 text-gold-500" />
                          <h4 className="font-medium text-zinc-100 font-serif">Media Showcase</h4>
                        </div>
                        <p className="text-sm text-zinc-400">
                          Manage your media gallery with images and videos organized by categories.
                        </p>
                      </Card>

                      <Card className="p-4 border border-zinc-800 bg-zinc-900/20 text-zinc-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Inbox className="h-5 w-5 text-gold-500" />
                          <h4 className="font-medium text-zinc-100 font-serif">Customer Inquiries</h4>
                        </div>
                        <p className="text-sm text-zinc-400">
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
                    <h3 className="text-lg font-medium mb-2 text-zinc-100 font-serif">Content Management Instructions</h3>
                    <p className="text-zinc-400 mb-4">
                      The Content Management section allows you to control all the content displayed across your website.
                    </p>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 mb-4 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Adding New Content</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                        <li>Click the <span className="font-medium text-gold-500">Add Content</span> button at the top of the page</li>
                        <li>Fill in the required fields (Title, URL, etc.)</li>
                        <li>Select the appropriate category for your content</li>
                        <li>Choose where on the website this content should appear using the Page Location and Page Section fields</li>
                        <li>Toggle the Active switch to make the content visible on the website</li>
                        <li>Click Save to publish your content</li>
                      </ol>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 mb-4 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Editing Existing Content</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                        <li>Find the content you want to edit in the list</li>
                        <li>Click the Edit button on that content item</li>
                        <li>Make your changes in the edit dialog</li>
                        <li>Click Update to save your changes</li>
                      </ol>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Understanding Page Locations and Sections</h4>
                      <p className="text-zinc-400 mb-2">
                        Content can be placed in different areas of your website using these settings:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                        <li><span className="font-medium text-gold-500">Page Location</span>: The page where the content will appear (Home, About, Services, etc.)</li>
                        <li><span className="font-medium text-gold-500">Page Section</span>: The specific area on that page (Hero Banner, Featured Content, Carousel, etc.)</li>
                        <li><span className="font-medium text-gold-500">Active</span>: Controls whether the content is visible or hidden on the website</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-zinc-100 font-serif">Media Showcase Management</h3>
                    <p className="text-zinc-400 mb-4">
                      The Media Showcase section allows you to manage all media content that will be available to administrators but not publicly visible on the website.
                    </p>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 mb-4 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Adding Media Content</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                        <li>Click the <span className="font-medium text-gold-500">Add Media</span> button at the top of the page</li>
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

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 mb-4 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Organizing Media by Categories</h4>
                      <p className="text-zinc-400 mb-2">
                        Your media content is organized into these categories:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                        <li><span className="font-medium text-gold-500">Promotional</span>: Marketing materials and promotional content</li>
                        <li><span className="font-medium text-gold-500">Staff</span>: Photos and videos of your staff members</li>
                        <li><span className="font-medium text-gold-500">Awards</span>: Recognition and achievements</li>
                        <li><span className="font-medium text-gold-500">CEO</span>: Content related to the CEO</li>
                        <li><span className="font-medium text-gold-500">Founder</span>: Content related to the founder</li>
                        <li><span className="font-medium text-gold-500">Videos</span>: All video content</li>
                      </ul>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Tips for Media Management</h4>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
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
                    <h3 className="text-lg font-medium mb-2 text-zinc-100 font-serif">Managing Customer Inquiries</h3>
                    <p className="text-zinc-400 mb-4">
                      The Customer Inquiries section allows you to view and respond to messages sent by visitors through your website's contact form.
                    </p>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 mb-4 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Viewing Inquiries</h4>
                      <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                        <li>All customer messages are listed with the most recent at the top</li>
                        <li>Each inquiry shows the customer's name, email, topic, and message</li>
                        <li>The status indicator shows whether the inquiry is new, in progress, or resolved</li>
                      </ul>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 mb-4 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Responding to Inquiries</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                        <li>Click on an inquiry to view its full details</li>
                        <li>Use the status dropdown to mark inquiries as "In Progress" or "Resolved"</li>
                        <li>Contact the customer directly via email or phone using the provided contact information</li>
                        <li>After responding, update the status to "Resolved"</li>
                      </ol>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-md border border-zinc-800 text-zinc-300">
                      <h4 className="font-medium mb-2 text-zinc-100 font-serif">Best Practices</h4>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
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
