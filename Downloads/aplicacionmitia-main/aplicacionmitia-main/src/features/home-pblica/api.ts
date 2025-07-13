
interface Testimonial {
    id: number;
    text: string;
    author: string;
    avatar: string;
  }
  
  export const getFeaturedTestimonials = async (): Promise<Testimonial[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    return [
      {
        id: 1,
        text: "This platform helped me find the right therapist for my needs. I'm very grateful.",
        author: "J. Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: 2,
        text: "A great tool for professionals. It has helped me manage my appointments and reach more clients.",
        author: "Dr. Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: 3,
        text: "Easy to use and very intuitive. I highly recommend it to anyone looking for mental health support.",
        author: "M. Jones",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ];
  };
  