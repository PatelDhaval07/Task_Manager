using System;
using System.Collections.Generic;
using System.Text;
using TaskManager_Utility.Enums.EnumList;

namespace TaskManager_Utility.Helper
{
    public static class StatusBuilder
    {
        /// <summary>
        /// Returns Success message
        /// </summary>
        /// <param name="messageType"></param>
        /// <returns></returns>
        public static StatusResponse ResponseSuccessStatus(string message)
        {
            return new StatusResponse() { StatusType = StatusType.Success, Message = message };
        }

        /// <summary>
        /// Returns Success message
        /// </summary>
        /// <param name="messageType"></param>
        /// <returns></returns>
        public static StatusResponse ResponseSuccessStatusWithValue(string message, dynamic data)
        {
            return new StatusResponse() { StatusType = StatusType.Success, Data = data, Message = message };
        }
        /// <summary>
        /// Returns Fail message
        /// </summary>
        /// <param name="messageType"></param>
        /// <returns></returns>
        public static StatusResponse ResponseFailStatus(string message)
        {
            return new StatusResponse() { StatusType = StatusType.Fail, Message = message };
        }


        /// <summary>
        /// Returns Exception message
        /// </summary>
        /// <param name="messageType"></param>
        /// <returns></returns>
        public static object ResponseExceptionStatus(Exception ex)
        {
            return new { StatusType = StatusType.Exception, Message = ex.Message, MessageDetail = "", ServiceException = ex };
        }
    }

    public static class StatusBuilder<T>
    {
        /// <summary>
        /// Build status response 
        /// </summary>
        /// <param name="messageType"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseStatus(T obj)
        {
            return new StatusResponse<T> { StatusType = StatusType.Success, Data = obj };
        }
        public static StatusResponse<T> ResponseStatus(T obj, string message)
        {
            return new StatusResponse<T> { StatusType = StatusType.Success, Data = obj, Message = message };
        }
        /// <summary>
        /// Build status response 
        /// </summary>
        /// <param name="messageType"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseStatus(IEnumerable<T> list)
        {
            return new StatusResponse<T> { StatusType = StatusType.Success, List = list };
        }

        /// <summary>
        /// build status response
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseStatusPaging(T Obj)
        {
            return new StatusResponse<T> { StatusType = StatusType.Success };
        }


        /// <summary>
        /// Build status response with Status Type
        /// </summary>
        /// <param name="messageType"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseStatus(StatusType messageType, T obj)
        {
            return new StatusResponse<T> { StatusType = messageType, Data = obj };
        }

        /// <summary>
        /// Build status response with message type and message
        /// </summary>
        /// <param name="messageType"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseStatus(StatusType messageType, string message, T obj)
        {
            return new StatusResponse<T> { StatusType = messageType, Message = message, Data = obj };
        }


        /// <summary>
        /// Build status reponse with message type,message, severity and message detail
        /// Mainly used for Fail status
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseFailStatus(string message)
        {
            return new StatusResponse<T> { StatusType = StatusType.Fail, Message = message };
        }

        /// <summary>
        /// Build status response with exception message and exception stack trace as message detail
        /// Mainly used to pass exception messages
        /// </summary>
        /// <param name="message"></param>
        /// <param name="messageDetail"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseException(string message, string messageDetail)
        {
            return new StatusResponse<T> { StatusType = StatusType.Exception, Message = message };
        }

        /// <summary>
        /// Build status response with Service exception
        /// </summary>
        /// <param name="serviceException"></param>
        /// <returns></returns>
        public static StatusResponse<T> ResponseException(Exception serviceException)
        {
            return new StatusResponse<T> { StatusType = StatusType.Exception, ServiceException = serviceException };
        }

    }
}
