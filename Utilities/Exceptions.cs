using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utility
{
    public class FreamworkException : SystemException
    {
        public FreamworkException(string message)
            : base(message)
        {
        }
    }

    public class BusinessException : FreamworkException
    {
        public ErrorType ErrorType
        {
            get;
            set;
        }

        public BusinessException(string message, ErrorType errorType)
            : base(message)
        {
            this.ErrorType = errorType;
        }
    }

    public class FatalException : FreamworkException
    {
        public FatalException(string message)
            : base(message)
        {

        }
    }
}
